const referralService = require('../services/referral.service');
const { handleSuccess } = require('../utils/responseHandlers');

async function generateReferralLink(req, res, next) {
  try {
    const userId = req.user.id;
    const referralCode = await referralService.generateReferralLink(userId);
    handleSuccess(res, 'Referral link generated successfully', referralCode);
  } catch (error) {
    next(error);
  }
}

async function expireReferralLink(req, res, next) {
  try {
    const userId = req.user.id;
    await referralService.expireReferralLink(userId);
    return handleSuccess(res, 'Referral link expired successfully');
  } catch (error) {
    next(error);
  }
}

async function verifyAndUseReferralLink(req, res, next) {
  try {
    const userId = req.user.id;
    const { referralCode } = req.body;

    if (!referralCode) {
      throw new BadRequestError('Referral code is required');
    }

    const success = await referralService.verifyAndUseReferralLink(
      userId,
      referralCode
    );

    if (success) {
      return handleSuccess(res, 'Referral link verified and used successfully');
    } else {
      throw new BadRequestError('Unable to verify and use the referral link');
    }
  } catch (error) {
    next(error);
  }
}

async function getReferralLink(req, res, next) {
  try {
    const referralCode = await referralService.fetchReferralLink(req.user.id);
    if (referralCode === '') {
      throw new NotFoundError('Referral link not found or expired');
    }
    return handleSuccess(
      res,
      'Referral link fetched successfully',
      referralCode
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateReferralLink,
  expireReferralLink,
  verifyAndUseReferralLink,
  getReferralLink,
};
