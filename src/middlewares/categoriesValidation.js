const Joi = require('joi');

const categoriesSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': '"name" is required',
  }),
});

const categoriesValidation = (req, res, next) => {
  const { error } = categoriesSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = categoriesValidation;