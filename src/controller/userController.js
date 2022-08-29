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

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userService.getById(id);

    if (!users) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req;
  try {
    await userService.deleteUser(userId);

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getAllUsers, getById, deleteUser };