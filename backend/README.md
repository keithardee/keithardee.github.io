# Backend for Contact Form

This small Express backend accepts contact form submissions and forwards them via SMTP using `nodemailer`.

Setup

1. Copy `.env.example` to `.env` and set values (SMTP settings, `TO_EMAIL`, etc.).
2. Install dependencies and run:

```bash
cd backend
npm install
npm run dev   # requires nodemon
```

API

- POST `/api/contact`  { name, email, message }

Response: `{ ok: true }` on success.

Notes

- For production, secure the endpoint (rate limiting, captcha) and use a reliable SMTP provider or transactional email API.
- Do NOT commit `.env` to source control. Use environment variables in deployment.
