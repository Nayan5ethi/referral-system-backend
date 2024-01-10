const express = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/validators/userValidator');
const { authenticateUser } = require('../middlewares/auth');
const validate = require('../middlewares/validators/validate');

const router = express.Router();

router.post(
  '/register',
  userValidator.registerUserValidator,
  validate,
  userController.registerUser
);
router.post(
  '/login',
  userValidator.loginUserValidator,
  validate,
  userController.loginUser
);
router.get('/details', authenticateUser, userController.fetchUserDetails);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *           example: John Doe
 *         username:
 *           type: string
 *           description: Unique username for the user
 *           example: johndoe123
 *         password:
 *           type: string
 *           description: User's password
 *           example: password123
 *         referralCode:
 *           type: string
 *           description: Referral code
 *           example: 123456
 *       required:
 *         - name
 *         - username
 *         - password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *           example: john_doe123
 *         password:
 *           type: string
 *           description: User's password
 *           example: password123
 *       required:
 *         - username
 *         - password
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user
 *     tags: [User]
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User registered successfully
 *               data:
 *                 user: "userID"
 *                 token: "token"
 *       '400':
 *         des/* user data * /cription: Bad request
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: error message
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login
 *     tags: [User]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User logged in successfully
 *               data:
 *                 user: userId
 *                 token: token
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
 * /api/user/details:
 *   get:
 *     summary: Get user details
 *     description: Endpoint to fetch user details
 *     tags: [User]
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
 *                 user: { username: "username", userId: "userId", name: "name" }
 *                 balance: 0
 *                 referralCode: { referralCode: "referralCode", remainingUses: 5 }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Unauthorized access
 */

