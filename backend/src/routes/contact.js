const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// We'll call SendGrid HTTP API directly via `fetch` when `SENDGRID_API_KEY` is present.
// This avoids adding an additional dependency and works in Node 18+.

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
  // accepts { forceEthereal: true } to bypass configured SMTP and use ethereal
  async function createTransporter({ forceEthereal = false } = {}) {
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
    if (!forceEthereal && hasSmtp && process.env.USE_ETHEREAL !== 'true') {
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
      <!-- Preheader text (hidden) -->
      <span style="display:none!important;visibility:hidden;mso-hide:all;opacity:0;color:transparent;height:0;width:0;">New message from ${safeName} via website</span>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8; padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background:#ffffff; border-radius:6px; overflow:hidden;">

              <!-- Header -->
              <tr>
                <td style="background:#111827; padding:18px 20px; text-align:left;">
                  <h1 style="margin:0; color:#ffffff; font-family:Helvetica, Arial, sans-serif; font-size:18px; font-weight:600;">Website Contact Form</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:20px; font-family:Helvetica, Arial, sans-serif; color:#111827; font-size:14px; line-height:1.5;">
                  <p style="margin:0 0 12px;">You have received a new message from your website contact form. See the details below.</p>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px; border-collapse:collapse;">
                    <tr style="border-bottom:1px solid #eef2f6;">
                      <td style="width:120px; vertical-align:top; padding:14px 0; font-weight:700; color:#374151;">Name</td>
                      <td style="padding:14px 0; color:#111827;">${safeName}</td>
                    </tr>

                    <tr style="border-bottom:1px solid #eef2f6;">
                      <td style="width:120px; vertical-align:top; padding:14px 0; font-weight:700; color:#374151;">Email</td>
                      <td style="padding:14px 0; color:#1f2937;"><a href="mailto:${safeEmail}" style="color:#2563EB; text-decoration:none;">${safeEmail}</a></td>
                    </tr>

                    <tr>
                      <td style="width:120px; vertical-align:top; padding:14px 0; font-weight:700; color:#374151;">Message</td>
                      <td style="padding:14px 0; color:#111827;">
                        <div style="background:#f9fafb; padding:12px; border-radius:4px; color:#111827; white-space:pre-wrap;">${safeMessageHtml}</div>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:18px 0 0; color:#6b7280; font-size:12px;">This message was sent from your website's contact form.</p>
                </td>
              </tr>

              <!-- Footer note -->
              <tr>
                <td style="background:#f9fafb; padding:12px 20px; text-align:center; font-family:Helvetica, Arial, sans-serif; color:#6b7280; font-size:12px; border-top:1px solid #e6e9ee;">
                  Reply directly to the sender to continue the conversation.
                </td>
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

      // Prefer SendGrid API if API key is provided (more reliable on cloud hosts)
      if (process.env.SENDGRID_API_KEY) {
        try {
          const sgPayload = {
            personalizations: [
              {
                to: [{ email: mailOptions.to }],
              },
            ],
            from: { email: mailOptions.from || process.env.FROM_EMAIL || process.env.SMTP_USER },
            reply_to: { email: mailOptions.replyTo },
            subject: mailOptions.subject,
            content: [
              { type: 'text/plain', value: mailOptions.text },
              { type: 'text/html', value: mailOptions.html },
            ],
          };

          const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sgPayload),
          });

          if (!sgRes.ok) {
            const txt = await sgRes.text();
            throw new Error(`SendGrid error: ${sgRes.status} ${txt}`);
          }

          console.log('Sent via SendGrid:', sgRes.status);
          return res.json({ ok: true, message: 'Message sent via SendGrid', status: sgRes.status });
        } catch (sgErr) {
          console.warn('SendGrid send failed, falling back to SMTP/Ethereal:', sgErr && (sgErr.message || sgErr));
        }
      }

      const createResult = await createTransporter();
      const transporter = createResult && createResult.transporter;
      const attempts = createResult && createResult.attempts;
      let previewUrl = createResult && createResult.previewUrl ? createResult.previewUrl : null;
      console.log('SMTP attempts:', attempts || []);

      if (!transporter) {
        console.error('No transporter available after attempts');
        return res.status(500).json({ error: 'SMTP transporter unavailable', detail: 'All transporter attempts failed', attempts: attempts || [] });
      }

      const sendPromise = transporter.sendMail(mailOptions);
      let info;
      try {
        info = await Promise.race([
          sendPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP send timed out (60s)')), 60000)),
        ]);
      } catch (sendErr) {
        console.warn('Initial send failed:', sendErr && sendErr.message);
        // If the send timed out or connection-related error, try Ethereal fallback once
        const isTimeout = (sendErr && /timed out/i.test(sendErr.message)) || (sendErr && ['ETIMEDOUT', 'ECONNECTION', 'ESOCKETTIMEDOUT'].includes(sendErr.code));
        if (isTimeout) {
          console.log('Attempting fallback send via Ethereal due to timeout/connection error');
          try {
            const eth = await createTransporter({ forceEthereal: true });
            if (eth && eth.transporter) {
              try {
                const resendInfo = await eth.transporter.sendMail(mailOptions);
                info = resendInfo;
                console.log('Ethereal resend succeeded');
                try {
                  const testPreview = nodemailer.getTestMessageUrl(resendInfo) || null;
                  if (testPreview) {
                    console.log('Preview URL (ethereal):', testPreview);
                    previewUrl = testPreview;
                  }
                } catch (e) {}
              } catch (resendErr) {
                console.error('Ethereal resend failed', resendErr && resendErr.message);
                throw resendErr;
              } finally {
                try { if (eth && typeof eth.transporter.close === 'function') eth.transporter.close(); } catch (e) {}
              }
            }
          } catch (ethErr) {
            console.error('Failed to create ethereal transporter for fallback', ethErr && ethErr.message);
          }
        }
        // If still no info, rethrow original error to be handled by outer catch
        if (!info) throw sendErr;
      }

      const messageId = info && (info.messageId || info.response) ? info.messageId || info.response : info;
      console.log('Mail send result:', messageId);

      // If running with ethereal/test transport, include preview URL in tests or logs
      try {
        const testPreview = nodemailer.getTestMessageUrl(info) || null;
        if (testPreview) {
          console.log('Preview URL:', testPreview);
          previewUrl = previewUrl || testPreview;
        }
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
    // Snapshot of relevant environment presence (do NOT expose secrets)
    const envSnapshot = {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT || null,
      SMTP_SECURE: process.env.SMTP_SECURE || null,
      SMTP_USER: !!process.env.SMTP_USER,
      USE_ETHEREAL: process.env.USE_ETHEREAL || null,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      TO_EMAIL: !!process.env.TO_EMAIL,
    };

    // Try to create transporter using configured SMTP
    let result = null;
    let createErr = null;
    try {
      result = typeof createTransporter === 'function' ? await createTransporter() : null;
    } catch (e) {
      createErr = String(e && e.message ? e.message : e);
      console.warn('createTransporter threw:', createErr);
    }

    // If no transporter, attempt Ethereal fallback for diagnostics
    if (!result || !result.transporter) {
      try {
        const eth = typeof createTransporter === 'function' ? await createTransporter({ forceEthereal: true }) : null;
        if (eth && eth.transporter) {
          result = eth;
          result.usedFallback = 'ethereal';
        }
      } catch (e) {
        console.warn('Ethereal fallback threw:', e && e.message);
      }
    }

    if (!result || !result.transporter) {
      return res.status(500).json({ ok: false, message: 'No transporter available', attempts: result && result.attempts ? result.attempts : [], env: envSnapshot, createError: createErr });
    }

    // verify once more (transporter.verify may have already been called, but do it to be explicit)
    try {
      await Promise.race([
        result.transporter.verify(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP verify timed out (15s)')), 15000)),
      ]);
    } catch (err) {
      return res.status(500).json({ ok: false, message: 'Verify failed', detail: err && err.message, attempts: result.attempts || [], usedFallback: result.usedFallback || null, env: envSnapshot });
    }

    return res.json({ ok: true, message: 'SMTP verify OK', attempts: result.attempts || [], usedFallback: result.usedFallback || null, env: envSnapshot });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Debug failed', detail: err && err.message });
  }
});

module.exports = router;
