const balanceService = require('../services/balance.service');
const { handleSuccess } = require('../utils/responseHandlers');

async function getUserBalance(req, res, next) {
  try {
    const userId = req.user.id;
    const balance = await balanceService.getUserBalance(userId);
    handleSuccess(res, 'User balance retrieved successfully', balance);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserBalance,
};
