const jwt = require('jsonwebtoken');
const key = require('../config').JWT_SECRET

const generateToken = (userId) => {
  return jwt.sign({ userId }, key, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, key);
};

module.exports = {
  generateToken,
  verifyToken,
};
