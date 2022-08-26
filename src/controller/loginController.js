const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email, password } }, JWT_SECRET, jwtConfig);

  return res.status(200).json({ token });
};
