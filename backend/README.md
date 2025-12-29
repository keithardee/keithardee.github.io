# Backend for Contact Form

This small Express backend accepts contact form submissions and forwards them via SMTP using `nodemailer`.

## Setup

1. Copy `.env.example` to `.env` and set values (SMTP settings, `TO_EMAIL`, etc.).
2. Install dependencies and run the dev server:

```powershell
cd backend
npm install
npm run dev   # uses nodemon
```

## Environment variables

Create a `.env` (do NOT commit it). Example variables:

- `SMTP_HOST` (e.g. `smtp.gmail.com`)
- `SMTP_PORT` (e.g. `465`)
- `SMTP_SECURE` (`true` for port 465, otherwise `false`)
- `SMTP_USER` (the SMTP username / email address)
- `SMTP_PASS` (the SMTP password or app password)
- `FROM_EMAIL` (optional sender address)
- `TO_EMAIL` (optional override for recipient; defaults to `keithardeelazo@gmail.com`)
- `USE_ETHEREAL` (`true` to force Nodemailer ethereal test account)

Notes for Gmail users:
- Google no longer supports "less secure apps" for regular passwords. Use an App Password (Google Account -> Security -> App passwords) and set it in `SMTP_PASS`.

## API

- POST `/api/contact`  JSON body: `{ name, email, message }`
  - Success response: `{ ok: true, message: 'Message sent' }`
  - On error returns `{ error: '...', detail: '...' }` with non-200 status.

## Local development (frontend)

When running the frontend locally, point it at the backend by setting `VITE_API_URL`:

PowerShell example:
```powershell
cd web
$env:VITE_API_URL = "http://localhost:4000"
npm run dev
```

Or add `VITE_API_URL="http://localhost:4000"` to an `.env` in the `web` folder (Vite reads `VITE_*` vars at build time).

## Testing without real SMTP

If you don't want to send real emails during development, set `USE_ETHEREAL=true` in `.env`. The server will create an Ethereal test account and return a preview URL in logs (emails won't be delivered to real inboxes).

## Troubleshooting

- If the server exits immediately or you can't connect to `http://localhost:4000`:
  - Run the server in foreground to see errors: `node src/index.js`.
  - Ensure Node.js version matches the project's `engines` (Node 20 recommended).
  - Ensure no other process is using port 4000: `netstat -ano | findstr ":4000"` on Windows.
  - Check that `.env` contains the required `SMTP_*` variables or set `USE_ETHEREAL=true` to test without SMTP.

- If emails fail with authentication errors using Gmail, verify you've created an App Password and that `SMTP_USER` is the full Gmail address.

## Security & production

- For production use a transactional email provider (SendGrid, Mailgun, Postmark, etc.) or use your cloud provider's recommended mail service.
- Add rate limiting, CAPTCHA, and monitoring to prevent spam and abuse.

## Quick test

- Health check: `curl http://localhost:4000/api/contact/test`
- Send a test message via curl:

```powershell
curl -X POST http://localhost:4000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","message":"Hello from test"}'
```

The backend will attempt to send mail using configured SMTP settings and return a JSON response.

Do NOT commit `.env` to source control. Keep credentials secret.
