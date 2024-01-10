const AppError = require('./error');

class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later.') {
    super(message, 429);
  }
}

module.exports = RateLimitError;
