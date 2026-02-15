# keithardee.github.io

This repository contains a personal portfolio website (`/web`) and a small Express backend (`/backend`) used to receive contact form submissions and forward them via SMTP.

## Structure

- `web/` — React + Vite frontend (static site deployed to GitHub Pages)
- `backend/` — Express API for contact form using `nodemailer`

## Quick start

Prerequisites: Node.js, npm

1. Install dependencies for both projects:

```bash
# from repository root
cd backend
npm install

cd ../web
npm install
```

2. Run locally

```bash
# start backend (reads .env or environment variables)
cd backend
npm run dev

# in a new terminal, start the frontend and point it at the backend
cd web
#$env:VITE_API_URL="http://localhost:4000"   # PowerShell
npm run dev
```

## Environment variables

Backend (`backend/.env.example`): copy to `.env` and fill values.

- `PORT` (optional)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` (true/false), `SMTP_USER`, `SMTP_PASS`
- `FROM_EMAIL`, `TO_EMAIL`

Frontend (`web/.env.example`): copy to `.env` for local dev.

- `VITE_API_URL` — set to your backend base URL (example: `https://api.example.com`). IMPORTANT: Vite injects env vars at build time, so set this when building for production.

## Building & deploying frontend (GitHub Pages)

Set `VITE_API_URL` to your deployed backend URL before building so the built static site knows where to POST contact messages.

Example (PowerShell):

```powershell
cd web
$env:VITE_API_URL="https://your-backend.example.com"
npm run build
npm run deploy   # uses gh-pages to push dist to gh-pages branch
```

If you build in CI (GitHub Actions), inject `VITE_API_URL` via an environment variable or secret.

## Deploy backend on Render (free tier)

Render can run the existing Express backend for free (with idle sleep). Steps:

1. Create a new Web Service from this repo.
2. Set the **Root Directory** to `backend`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add environment variables from your local `.env` (never commit secrets).
6. After deploy, copy the Render service URL (example: `https://your-service.onrender.com`).

Update GitHub Actions secrets:

- `BACKEND_URL` = your Render service base URL.

This is used for both the frontend build (as `VITE_API_URL`) and the keep-alive ping workflow.

## Running backend tests

Backend contains Jest + Supertest tests that exercise the contact route with an Ethereal fallback:

```bash
cd backend
npm test
```

## Troubleshooting contact form not sending

- If the site returns `Error: Failed to send message`, check the browser DevTools Network tab to see the request URL and response code.
- Ensure `VITE_API_URL` is pointing to your running backend from the deployed static site (GitHub Pages cannot reach `localhost`).
- On the backend, check logs for nodemailer errors (authentication, connection or timeout). If SMTP credentials are missing, the backend falls back to an Ethereal test account in local/test mode.

## Next steps / Recommendations

- Deploy the backend to a hosted provider (Render, Fly, Heroku) and set SMTP env vars there.
- Use a transactional email provider (SendGrid, Mailgun, Postmark) for reliable delivery.
- Add rate limiting and a CAPTCHA to the contact endpoint before exposing publicly.

The GitHub Actions workflow builds the frontend with `VITE_API_URL` set from `BACKEND_URL`.
