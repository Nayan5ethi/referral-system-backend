const User = require('../models/user.model');
const Referral = require('../models/referral.model');
const Balance = require('../models/balance.model');
const { NotFoundError, InvalidReferralLinkError } = require('../errors');
const { v4: uuidv4 } = require('uuid');

function generateUniqueReferralCode() {
  const uniqueReferralCode = uuidv4();
  return uniqueReferralCode;
}

function generateUniqueReferralCodeV2(userId) {
  const timestamp = Date.now();
  const uniqueReferralCode = `${timestamp}-${userId}`;
  return uniqueReferralCode;
}

async function generateReferralLink(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const existingReferral = await Referral.findOne({ userId });
    if (existingReferral && existingReferral.remainingUses > 0) {
      return {
        code: existingReferral.code,
        remainingUses: existingReferral.remainingUses,
      };
    }

    const code = generateUniqueReferralCode();

    await Referral.findOneAndUpdate(
      { userId },
      { code, remainingUses: 5 },
      { upsert: true, new: true }
    );

    return { code, remainingUses: 5 };
  } catch (error) {
    throw error;
  }
}

async function expireReferralLink(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const referral = await Referral.findOne({ userId });
    if (!referral || referral.remainingUses <= 0) {
      throw new NotFoundError('No active referral link found');
    }
    await Referral.findOneAndRemove({ userId });

    return true;
  } catch (error) {
    throw error;
  }
}

async function verifyAndUseReferralLink(userId, referralCode) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const referral = await Referral.findOne({ code: referralCode });
    if (!referral || referral.remainingUses <= 0) {
      throw new InvalidReferralLinkError();
    }

    if (referral.userId.toString() === userId.toString()) {
      throw new BadRequestError('You cannot use your own referral link');
    }

    const balance = await Balance.findOne({ userId: referral.userId });
    balance.credits += 5000;

    await Referral.findByIdAndUpdate(referral._id, {
      $inc: { remainingUses: -1 },
    });

    if (referral.remainingUses === 0) {
      await generateReferralLink(userId);
    }

    await balance.save();

    return true;
  } catch (error) {
    throw error;
  }
}

async function fetchReferralLink(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const referral = await Referral.findOne({ userId });

    if (!referral || referral.remainingUses <= 0) {
      return { code: '', remainingUses: 0 };
    }

    return { code: referral.code, remainingUses: referral.remainingUses };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateReferralLink,
  expireReferralLink,
  verifyAndUseReferralLink,
  fetchReferralLink,
};
