Deploying only the `backend` folder to Railway

1. In Railway, create a new Project and choose "Deploy from GitHub".
2. Select your repository `keithardee.github.io`.
3. When configuring the service, set the **Root Directory** to `backend` (important).
   - This ensures Railway uses `backend/package.json` and the `start` script.
4. In Railway Settings → Variables, add these environment variables (copy values from your local `backend/.env`):
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE` (true/false)
   - `SMTP_USER`
   - `SMTP_PASS`
   - `FROM_EMAIL`
   - `TO_EMAIL`
   - `FRONTEND_URL` = `https://keithardee.github.io`
5. Deploy. Railway will run `npm install` and `npm start` using `backend/package.json`.

Quick checks after deploy:

```
curl -i https://<your-railway-url>/api/contact/test
```

If you see `{"ok":true,"message":"contact test OK"}` the backend is reachable.

Next steps:
- Add `BACKEND_URL` repository secret in GitHub (value = your Railway URL) and push to `main` to trigger the frontend build workflow.
