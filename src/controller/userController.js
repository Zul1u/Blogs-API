const userService = require('../service/userService');
const { createToken } = require('../helpers/token');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await userService.createUser({ displayName, email, password, image });

    const payload = { email, password };
    const token = createToken(payload);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser };