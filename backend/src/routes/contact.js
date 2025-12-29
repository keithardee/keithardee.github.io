const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Basic rate-limiting or spam protection could be added here.

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}

function sanitizeHeader(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim();
}

router.post('/', async (req, res) => {
  console.log('Received POST /api/contact from', req.ip);
  const { name, email, message } = req.body || {};
  const rawName = sanitizeHeader(name);
  const rawEmail = sanitizeHeader(email);
  const rawMessage = (message || '').toString().trim();

  if (!rawName || !rawEmail || !rawMessage) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!isValidEmail(rawEmail)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (rawMessage.length > 10000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // Create transporter from environment variables or ethereal test account
  async function createTransporter() {
    const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    console.log('SMTP config present?', hasSmtp);
    console.log('SMTP host present?', !!process.env.SMTP_HOST, 'SMTP port:', process.env.SMTP_PORT || 'n/a');

    // Helper to attempt creating and verifying a transporter
    const attempts = [];
    async function attemptTransport(config, name) {
      const cfgLog = Object.assign({}, config, { auth: undefined });
      attempts.push({ name: name || 'unnamed', config: cfgLog });
      try {
        // Add reasonable timeouts to help fail fast or wait longer when needed
        const transporter = nodemailer.createTransport(Object.assign({
          connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT || '20000', 10),
          greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT || '20000', 10),
          socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT || '20000', 10),
        }, config));

        // verify connection/authentication with a slightly larger timeout
        await Promise.race([
          transporter.verify(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP verify timed out (15s)')), 15000)),
        ]);
        return { transporter, attempts };
      } catch (err) {
        console.warn('Transport verify failed for config', cfgLog, err && err.message);
        return null;
      }
    }

    // If SMTP configured, try the provided settings first (unless forcing ethereal)
    if (hasSmtp && process.env.USE_ETHEREAL !== 'true') {
      // Try the configured settings first
      const primaryConfig = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };

      const primaryResult = await attemptTransport(primaryConfig, 'primary');
      if (primaryResult) return { transporter: primaryResult.transporter, previewUrl: null, attempts: primaryResult.attempts };

      // Try STARTTLS style (587)
      const startTlsConfig = {
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: true },
      };
      const startTlsResult = await attemptTransport(startTlsConfig, 'starttls-587');
      if (startTlsResult) return { transporter: startTlsResult.transporter, previewUrl: null, attempts: startTlsResult.attempts };

      // Try implicit SSL (465)
      const sslConfig = {
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };
      const sslResult = await attemptTransport(sslConfig, 'ssl-465');
      if (sslResult) return { transporter: sslResult.transporter, previewUrl: null, attempts: sslResult.attempts };

      // Try service: 'gmail' helper (sometimes helps with Gmail-specific settings)
      const gmailServiceConfig = {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };
      const gmailResult = await attemptTransport(gmailServiceConfig, 'service-gmail');
      if (gmailResult) return { transporter: gmailResult.transporter, previewUrl: null, attempts: gmailResult.attempts };

      console.warn('All configured SMTP attempts failed; falling back to Ethereal if available');
    }

    // Fallback: create ethereal test account (useful for local testing and CI)
    try {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Using ethereal test account for email (no real emails will be delivered)');
      return { transporter, previewUrl: 'ethereal', attempts: attempts };
    } catch (err) {
      console.warn('Failed to create ethereal test account, attempting partial config if any', err && err.message);
      // Last-resort: return transporter built from whatever env is present
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'localhost',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      return { transporter, previewUrl: null, attempts: attempts };
    }
  }

  const safeName = escapeHtml(rawName);
  const safeEmail = escapeHtml(rawEmail);
  const safeMessageHtml = escapeHtml(rawMessage).replace(/\n/g, '<br/>');
  // Ensure recipient is explicitly set to the configured TO_EMAIL (or fallback to your personal email)
  const recipient = (process.env.TO_EMAIL && process.env.TO_EMAIL.trim()) || (process.env.FROM_EMAIL && process.env.FROM_EMAIL.trim()) || (process.env.SMTP_USER && process.env.SMTP_USER.trim()) || 'keithardeelazo@gmail.com';

  const mailOptions = {
    from: process.env.FROM_EMAIL || process.env.SMTP_USER || `no-reply@${process.env.HOSTNAME || 'website'}`,
    to: recipient, // always deliver to the configured recipient (your personal email)
    replyTo: rawEmail,
    subject: `New message from ${safeName} via website`,
    text: `Name: ${rawName}\nEmail: ${rawEmail}\n\nMessage:\n${rawMessage}`,
    html: `
      <span style="display:none !important; visibility:hidden; mso-hide:all;">New message from ${safeName} via website</span>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F5F6F7; padding:20px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:6px; overflow:hidden;">
              <tr>
                <td style="background:#7B7F85; padding:20px 24px; color:#F5F6F7; font-family:Arial, Helvetica, sans-serif; font-size:18px;">
                  <strong>Website Contact Form</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px; font-family:Arial, Helvetica, sans-serif; color:#333333; font-size:14px; line-height:1.4;">
                  <p style="margin:0 0 12px;">You have received a new message from your website contact form. Details below:</p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;">
                    <tr>
                      <td style="padding:6px 0; font-weight:600; width:90px; vertical-align:top;">Name</td>
                      <td style="padding:6px 0;">${safeName}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0; font-weight:600; vertical-align:top;">Email</td>
                      <td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:#7B7F85; text-decoration:none;">${safeEmail}</a></td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0; font-weight:600; vertical-align:top;">Message</td>
                      <td style="padding:6px 0;">${safeMessageHtml}</td>
                    </tr>
                  </table>
                  <p style="margin:18px 0 0; color:#666666; font-size:12px;">This message was sent from your website's contact form.</p>
                </td>
              </tr>
              <tr>
                <td style="background:#FFFFFF; border-top:1px solid #C1C4C8; padding:12px 24px; text-align:center; font-family:Arial, Helvetica, sans-serif; color:#7B7F85; font-size:12px;">Reply directly to the sender to continue the conversation.</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  };

  // Log final addressing for debugging and verification
  console.log('Prepared email -> to:', recipient, ', from:', mailOptions.from, ', replyTo:', mailOptions.replyTo);

    try {
      console.log('Attempting to send mail to', mailOptions.to);
        const createResult = await createTransporter();
        const transporter = createResult && createResult.transporter;
        const attempts = createResult && createResult.attempts;
        console.log('SMTP attempts:', attempts || []);

        if (!transporter) {
          console.error('No transporter available after attempts');
          return res.status(500).json({ error: 'SMTP transporter unavailable', detail: 'All transporter attempts failed', attempts: attempts || [] });
        }

        const sendPromise = transporter.sendMail(mailOptions);
      const info = await Promise.race([
        sendPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP send timed out (60s)')), 60000)),
      ]);

      const messageId = info && (info.messageId || info.response) ? info.messageId || info.response : info;
      console.log('Mail send result:', messageId);

      // If running with ethereal/test transport, include preview URL in tests or logs
      try {
        const testPreview = nodemailer.getTestMessageUrl(info) || null;
        if (testPreview) console.log('Preview URL:', testPreview);
      } catch (e) {
        // ignore
      }

      const response = { ok: true, message: 'Message sent' };
      if (process.env.NODE_ENV === 'test' || process.env.USE_ETHEREAL === 'true') {
        response.previewUrl = previewUrl || null;
        response.info = messageId;
      }
      try {
        if (transporter && typeof transporter.close === 'function') transporter.close();
      } catch (e) {
        // ignore
      }

      return res.json(response);
    } catch (err) {
      console.error('Error sending mail', err && err.message, err && err.code, err && err.response);
      const detail = err && err.message ? String(err.message) : 'Unknown error';
      const code = err && err.code ? String(err.code) : undefined;
      return res.status(500).json({ error: 'Failed to send message', detail, code });
    }
});

// Simple test endpoint to verify backend is reachable
router.get('/test', (req, res) => {
  console.log('Received GET /api/contact/test from', req.ip);
  res.json({ ok: true, message: 'contact test OK' });
});

// Debug endpoint: verify SMTP connection attempts without sending an email
router.get('/debug-smtp', async (req, res) => {
  try {
    const result = await (async () => {
      // reuse createTransporter from above by calling it indirectly
      return await (typeof createTransporter === 'function' ? createTransporter() : Promise.resolve(null));
    })();

    if (!result || !result.transporter) {
      return res.status(500).json({ ok: false, message: 'No transporter available', attempts: result && result.attempts ? result.attempts : [] });
    }

    // verify once more (transporter.verify may have already been called, but do it to be explicit)
    try {
      await Promise.race([
        result.transporter.verify(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP verify timed out (15s)')), 15000)),
      ]);
    } catch (err) {
      return res.status(500).json({ ok: false, message: 'Verify failed', detail: err && err.message, attempts: result.attempts || [] });
    }

    return res.json({ ok: true, message: 'SMTP verify OK', attempts: result.attempts || [] });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Debug failed', detail: err && err.message });
  }
});

module.exports = router;
