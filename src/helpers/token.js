const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const JWT_CONFIG = { expiresIn: '1d', algorithm: 'HS256' };

const createToken = (payload) => {
  const token = jwt.sign({ data: payload }, JWT_SECRET, JWT_CONFIG);
  return token;
};

module.exports = { createToken };