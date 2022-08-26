const jwt = require('jsonwebtoken');
require('dotenv').config();

const userService = require('../service/userService');

const { JWT_SECRET } = process.env;

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await userService.createUser({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email, password } }, JWT_SECRET, jwtConfig);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser };