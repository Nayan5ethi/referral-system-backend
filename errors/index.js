const AppError = require('./error');

module.exports = {
  AppError,
  BadRequestError: require('./badRequest'),
  UnauthorizedError: require('./unauthorized'),
  InvalidReferralLinkError: require('./invalidReferralLink'),
  NotFoundError: require('./notFound'),
  RateLimitError: require('./rateLimit'),
  PreconditionFailedError: require('./preconditionFailed'),
};
