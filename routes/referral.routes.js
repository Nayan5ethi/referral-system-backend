const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referral.controller');
const { authenticateUser } = require('../middlewares/auth');
const referralValidator = require('../middlewares/validators/referralValidator');
const validate = require('../middlewares/validators/validate');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.post(
  '/generate',
  rateLimiter,
  authenticateUser,
  referralController.generateReferralLink
);
router.post('/expire', authenticateUser, referralController.expireReferralLink);
router.post(
  '/verify',
  rateLimiter,
  authenticateUser,
  referralValidator.verifyAndUseValidator,
  validate,
  referralController.verifyAndUseReferralLink
);
router.get('/find', authenticateUser, referralController.getReferralLink);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Referral
 *   description: Referral code management
 */

/**
 * @swagger
 * /api/referral/generate:
 *   post:
 *     summary: Generate a referral code
 *     description: Endpoint to generate a referral code
 *     tags: [Referral]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       '200':
 *         description: Successful request
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Referral code generated successfully
 *               data:
 *                 referralCode: 'abc123'
 *                 remainingUses: 5
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unauthorized access
 */

/**
 * @swagger
 * /api/referral/expire:
 *   post:
 *     summary: Expire a referral code
 *     description: Endpoint to expire a referral code
 *     tags: [Referral]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful request
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Referral code expired successfully
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unauthorized access
 */

/**
 * @swagger
 * /api/referral/verify:
 *   post:
 *     summary: Verify and use a referral code
 *     description: Endpoint to verify and use a referral code
 *     tags: [Referral]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Referral code verification details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReferralVerification'
 *     responses:
 *       '200':
 *         description: Successful request
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Referral code verified and used successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Invalid input
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unauthorized access
 *       '429':
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Rate limit exceeded
 */

/**
 * @swagger
 * /api/referral/find:
 *   get:
 *     summary: Get user's referral code
 *     description: Endpoint to fetch user's referral code
 *     tags: [Referral]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful request
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User's referral code retrieved successfully
 *               data:
 *                 referralCode: 'abc123'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unauthorized access
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReferralVerification:
 *       type: object
 *       properties:
 *         referralCode:
 *           type: string
 *           description: Referral code to be verified and used
 *           example: abc123
 *       required:
 *         - referralCode
 */
