const express = require('express');
const validateLogin = require('../middlewares/validateLogin');
const loginController = require('../controller/loginController');

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, loginController);

module.exports = loginRoute;