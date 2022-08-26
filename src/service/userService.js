const { User } = require('../database/models');

const emailVerify = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const createUser = async ({ displayName, email, password, image }) => {
  const result = await User.create(
    { displayName, email, password, image },
  );
  return result;
};

const getAllUsers = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

const getById = async (id) => {
  const result = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return result;
};

module.exports = { createUser, emailVerify, getAllUsers, getById };