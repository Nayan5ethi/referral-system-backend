const Balance = require('../models/balance.model');
const { NotFoundError } = require('../errors');

async function getUserBalance(userId) {
  try {
    const balance = await Balance.findOne({ userId });
    if (!balance) {
      throw new NotFoundError('Balance not found for the user');
    }

    return balance.credits;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserBalance,
};
