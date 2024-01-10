const rateLimit = require('express-rate-limit');
const config = require('../config').rateLimit;
const { RateLimitError } = require('../errors');

const rateLimitErrorHandler = (req, res, next) => {
  throw new RateLimitError('Too many requests, please try again later.');
};

const rateLimiter = rateLimit({
  windowMs: config.windowMs,
  max: config.maxRequests,
  handler: rateLimitErrorHandler,
});

module.exports = {
  rateLimiter,
};
