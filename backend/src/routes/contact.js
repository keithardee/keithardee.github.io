const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Basic rate-limiting or spam protection could be added here.

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Create transporter from environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.TO_EMAIL || process.env.SMTP_USER,
    subject: `New message from ${name} via website`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ ok: true, message: 'Message sent' });
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
