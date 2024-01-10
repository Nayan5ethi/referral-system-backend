const User = require('../models/user.model');
const Balance = require('../models/balance.model');
const bcrypt = require('bcrypt');
const { BadRequestError, NotFoundError } = require('../errors');
const referralService = require('./referral.service');
const { generateToken } = require('../utils/jwt');

async function registerUser(name, username, password, referralCode) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new BadRequestError('Username is already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    if (referralCode) {
      await referralService.verifyAndUseReferralLink(newUser._id, referralCode);
    }

    await Balance.create({ userId: newUser._id });

    await referralService.generateReferralLink(newUser._id);

    return { user: newUser };
  } catch (error) {
    await User.findOneAndDelete({ username });
    throw error;
  }
}

async function loginUser(username, password) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestError('Invalid password');
    }

    const token = generateToken(user._id);

    return { user, token };
  } catch (error) {
    throw error;
  }
}

async function fetchUserDetails(userId) {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return { userId: user._id, name: user.name, username: user.username };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  fetchUserDetails,
};
