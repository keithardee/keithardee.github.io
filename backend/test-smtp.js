const nodemailer = require('nodemailer');
require('dotenv').config();

(async () => {
  const cfg = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT || '20000', 10),
    greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT || '20000', 10),
    socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT || '20000', 10),
  };

  console.log('Testing SMTP with config (auth hidden):', Object.assign({}, cfg, { auth: undefined }));

  try {
    const transporter = nodemailer.createTransport(cfg);
    console.log('Calling transporter.verify()...');
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('verify timed out (20s)')), 20000)),
    ]);
    console.log('SMTP verify: OK');
    process.exit(0);
  } catch (err) {
    console.error('SMTP verify failed:', err && err.message);
    if (err && err.response) console.error('Response:', err.response);
    if (err && err.code) console.error('Code:', err.code);
    process.exit(2);
  }
})();
