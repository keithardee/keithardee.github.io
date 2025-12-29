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
    const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    if (hasSmtp && process.env.USE_ETHEREAL !== 'true') {
      return { transporter: nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }), previewUrl: null };
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
      return { transporter, previewUrlBase: 'ethereal' };
    } catch (err) {
      // If creating test account failed, still try to create a transport with any partial config
      return { transporter: nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }), previewUrl: null };
    }
  }

  const safeName = escapeHtml(rawName);
  const safeEmail = escapeHtml(rawEmail);
  const safeMessageHtml = escapeHtml(rawMessage).replace(/\n/g, '<br/>');

  const mailOptions = {
    from: process.env.FROM_EMAIL || process.env.SMTP_USER || `no-reply@${process.env.HOSTNAME || 'website'}`,
    to: 'keithardeelazo@gmail.com', // fixed recipient to ensure messages arrive in your Gmail
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

  try {
    console.log('Attempting to send mail to', mailOptions.to);
    const { transporter, previewUrlBase } = await createTransporter();
    const sendPromise = transporter.sendMail(mailOptions);
    const info = await Promise.race([
      sendPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP send timed out (20s)')), 20000)),
    ]);

    const messageId = info && (info.messageId || info.response) ? info.messageId || info.response : info;
    console.log('Mail send result:', messageId);

    // If running with ethereal/test transport, include preview URL in tests or logs
    let previewUrl = null;
    try {
      previewUrl = nodemailer.getTestMessageUrl(info) || null;
      if (previewUrl) console.log('Preview URL:', previewUrl);
    } catch (e) {
      // ignore
    }

    const response = { ok: true, message: 'Message sent' };
    if (process.env.NODE_ENV === 'test' || process.env.USE_ETHEREAL === 'true') {
      response.previewUrl = previewUrl || null;
      response.info = messageId;
    }
    // Close transport if supported to avoid open handles (helps tests exit cleanly)
    try {
      if (transporter && typeof transporter.close === 'function') transporter.close();
    } catch (e) {
      // ignore
    }

    return res.json(response);
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ error: 'Failed to send message', detail: err.message });
  }
});

module.exports = router;

// Simple test endpoint to verify backend is reachable
router.get('/test', (req, res) => {
  console.log('Received GET /api/contact/test from', req.ip);
  res.json({ ok: true, message: 'contact test OK' });
});
