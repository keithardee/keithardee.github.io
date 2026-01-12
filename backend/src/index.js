const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contact');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configure CORS: accept FRONTEND_URL (comma-separated) in production,
// but allow any origin when running in development (localhost) so local
// frontend can call the backend without CORS issues.
const isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
  app.use(cors({ origin: true }));
} else {
  const allowed = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  // If no FRONTEND_URL configured, allow all by default to avoid accidental
  // lockout; otherwise restrict to the provided list.
  const originOption = allowed.length ? allowed : true;
  app.use(cors({ origin: originOption }));
}
app.use(express.json());

app.use('/api/contact', contactRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Contact backend running' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
  });
}

module.exports = app;
