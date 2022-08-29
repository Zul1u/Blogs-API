const express = require('express');

const tokenValidation = require('../middlewares/auth');
const blogPostValidation = require('../middlewares/blogPostValidation');
const blogPostController = require('../controller/blogPostController');

const blogPostRoute = express.Router();

blogPostRoute.use(tokenValidation);

blogPostRoute.post(
  '/',
  blogPostValidation.bodyValidation,
  blogPostValidation.categoryVerify,
  blogPostController.createPost,
);

blogPostRoute.get('/', blogPostController.getAllPosts);
blogPostRoute.get('/:id', blogPostValidation.postIdVerify, blogPostController.getByPk);

blogPostRoute.put(
  '/:id',
  blogPostValidation.postIdVerify,
  blogPostValidation.userVerify,
  blogPostValidation.updateBodyValidation,
  blogPostController.updatePost,
);

blogPostRoute.delete(
  '/:id',
  blogPostValidation.postIdVerify,
  blogPostValidation.userVerify,
  blogPostController.deletePost,
);

module.exports = blogPostRoute;