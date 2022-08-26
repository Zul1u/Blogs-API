const { verifyToken } = require('../helpers/token');

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    verifyToken(authorization);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;