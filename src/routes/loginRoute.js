const express = require('express');
const loginValidation = require('../middlewares/loginValidation');
const loginController = require('../controller/loginController');

const loginRoute = express.Router();

loginRoute.post('/', loginValidation, loginController);

module.exports = loginRoute;