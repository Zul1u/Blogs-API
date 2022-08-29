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

module.exports = { bodyValidation, categoryVerify };