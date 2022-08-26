const express = require('express');

const userRoute = express.Router();

const userController = require('../controller/userController');
const validation = require('../middlewares/userValidation');

userRoute.post('/',
  validation.userValidation, validation.emailValidation, userController.createUser);

module.exports = userRoute;