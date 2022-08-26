const express = require('express');

const userRoute = express.Router();

const userController = require('../controller/userController');
const validation = require('../middlewares/userValidation');
const tokenValidation = require('../middlewares/auth');

userRoute.post(
  '/',
  validation.userValidation,
  validation.emailValidation,
  userController.createUser,
);
userRoute.use(tokenValidation);

userRoute.get('/', userController.getAllUsers);

module.exports = userRoute;