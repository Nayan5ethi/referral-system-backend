const { validationResult } = require('express-validator');
const { handleError } = require('../../utils/responseHandlers');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return handleError(res, errorMessages, 412);
  }
  next();
}

module.exports = validate;
