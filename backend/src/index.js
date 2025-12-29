const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contact');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
};
app.use(cors(corsOptions));
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
