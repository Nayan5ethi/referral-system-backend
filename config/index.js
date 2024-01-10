require('dotenv').config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: 3000,
  rateLimit: {
    windowMs: 10 * 60 * 1000,
    maxRequests: 5,
  },
};

module.exports = config;
