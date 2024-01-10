const userService = require('../services/user.service');
const balanceService = require('../services/balance.service');
const referralService = require('../services/referral.service');
const { generateToken } = require('../utils/jwt');
const { handleSuccess } = require('../utils/responseHandlers');

async function registerUser(req, res, next) {
  try {
    const { name, username, password, referralCode } = req.body;
    const result = await userService.registerUser(
      name,
      username,
      password,
      referralCode
    );
    const token = generateToken(result.user._id);
    return handleSuccess(res, 'User registered successfully', {
      user: result.user._id,
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await userService.loginUser(username, password);
    const token = generateToken(result.user._id);
    handleSuccess(res, 'User logged in successfully', {
      user: result.user._id,
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function fetchUserDetails(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await userService.fetchUserDetails(userId);
    const balance = await balanceService.getUserBalance(userId);
    const referral = await referralService.fetchReferralLink(userId);
    const data = {
      user,
      balance,
      referral,
    };
    handleSuccess(res, 'User balance retrieved successfully', data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  fetchUserDetails,
};
