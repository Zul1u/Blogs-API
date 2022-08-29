const { User } = require('../database/models');

const emailVerify = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async ({ displayName, email, password, image }) => {
  const newUser = await User.create(
    { displayName, email, password, image },
  );
  return newUser;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = { createUser, emailVerify, getAllUsers, getById, deleteUser };