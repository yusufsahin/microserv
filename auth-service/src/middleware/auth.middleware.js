const { verifyToken } = require('../utils/jwt.utils');

const authenticateJWT = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];

  // Check if the token exists and follows the "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'No token provided or incorrect format!' });
  }

  // Extract the token from the Bearer string
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and extract user data
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

module.exports = authenticateJWT;
