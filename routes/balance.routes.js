const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balance.controller');
const { authenticateUser } = require('../middlewares/auth');

router.get('/', authenticateUser, balanceController.getUserBalance);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: User balance management
 */

/**
 * @swagger
 * /api/balance:
 *   get:
 *     summary: Get user balance
 *     description: Endpoint to fetch user's balance
 *     tags: [Balance]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful request
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User balance retrieved successfully
 *               data:
 *                 balance: 5000
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
 *     BalanceResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the response (success/error)
 *           example: success
 *         message:
 *           type: string
 *           description: Detailed message about the request status
 *           example: User balance retrieved successfully
 *         data:
 *           type: object
 *           properties:
 *             balance:
 *               type: number
 *               description: User's current balance
 *               example: 5000
 */