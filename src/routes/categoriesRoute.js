const express = require('express');

const categoriesValidation = require('../middlewares/categoriesValidation');
const categoriesController = require('../controller/categoriesController');

const tokenValidation = require('../middlewares/auth');

const categoriesRoute = express.Router();

categoriesRoute.use(tokenValidation);

categoriesRoute.post('/', categoriesValidation, categoriesController.createCategory);
categoriesRoute.get('/', categoriesController.getAllCategories);

module.exports = categoriesRoute;