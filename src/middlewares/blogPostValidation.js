const Joi = require('joi');

const blogPostService = require('../service/blogPostService');

const EMPTY_MESSAGE = 'Some required fields are missing';

const blogPostSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.empty': EMPTY_MESSAGE,
    'string.min': EMPTY_MESSAGE,
  }),
  content: Joi.string().min(3).required().messages({
    'string.empty': EMPTY_MESSAGE,
    'string.min': EMPTY_MESSAGE,
  }),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const bodyValidation = (req, res, next) => {
  const { error } = blogPostSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const categoryVerify = async (req, res, next) => {
  const { categoryIds } = req.body;
  try {
    const getCategory = await categoryIds.map(async (categoryId) => (
      blogPostService.categoryVerify(categoryId)
    ));

    const resolveCategory = await Promise.all(getCategory);

    const verifyCategory = resolveCategory.every((category) => category);
    if (!verifyCategory) return res.status(400).json({ message: '"categoryIds" not found' });

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const postIdVerify = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await blogPostService.getByPk(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const userVerify = async (req, res, next) => {
  try {
    const post = await blogPostService.getByPk(req.params.id);
    if (post.dataValues.userId !== req.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateBlogPostSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.empty': EMPTY_MESSAGE,
    'string.min': EMPTY_MESSAGE,
  }),
  content: Joi.string().min(3).required().messages({
    'string.empty': EMPTY_MESSAGE,
    'string.min': EMPTY_MESSAGE,
  }),
});

const updateBodyValidation = (req, res, next) => {
  const { error } = updateBlogPostSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = { bodyValidation, categoryVerify, postIdVerify, userVerify, updateBodyValidation };