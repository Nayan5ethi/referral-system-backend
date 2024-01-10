const { body } = require('express-validator');

const verifyAndUseValidator = [
  body('referralCode')
    .notEmpty()
    .withMessage('Referral code is required')
    .isString()
    .withMessage('Referral Code must be a string'),
];

module.exports = {
  verifyAndUseValidator,
};
