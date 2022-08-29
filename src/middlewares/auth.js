const { verifyToken } = require('../helpers/token');
const userService = require('../service/userService');

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const { data: { email } } = verifyToken(authorization);

    const user = await userService.emailVerify(email);
    req.userId = user.dataValues.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;