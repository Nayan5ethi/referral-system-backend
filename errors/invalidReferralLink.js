const AppError = require('./error');

class InvalidReferralLinkError extends AppError {
  constructor(message = 'Invalid Referral Link') {
    super(message, 412);
  }
}

module.exports = InvalidReferralLinkError;
