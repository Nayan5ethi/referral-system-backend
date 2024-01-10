const { UnauthorizedError } = require('../errors');
const { verifyToken } = require('../utils/jwt');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Token not provided');
  }

  const token = authHeader.substring('Bearer '.length);

  try {
    const decodedToken = verifyToken(token);

    req.user = { id: decodedToken.userId };

    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
};

module.exports = {
  authenticateUser,
};
