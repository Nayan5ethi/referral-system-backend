const express = require('express');
const userRoutes = require('./user.routes');
const referralRoutes = require('./referral.routes');
const balanceRoutes = require('./balance.routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/referral', referralRoutes);
router.use('/balance', balanceRoutes);

module.exports = router;
