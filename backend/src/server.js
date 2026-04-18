require('dotenv').config();
const app = require('./app');
const { connect } = require('./config/db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`🚀 Fitza backend running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  });
};

start();