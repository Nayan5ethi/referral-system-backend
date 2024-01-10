const { AppError } = require('../errors');
const { handleError } = require('../utils/responseHandlers');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    console.error(err);
    return handleError(res, err.message, err.statusCode);
  }

  console.error(err);
  return handleError(res, 'Internal Server Error', 500);
}

module.exports = errorHandler;
