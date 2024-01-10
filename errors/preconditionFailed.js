const AppError = require('./error');

class PreconditionFailedError extends AppError {
  constructor(message = 'Precondition Failed') {
    super(message, 412);
  }
}

module.exports = PreconditionFailedError;
