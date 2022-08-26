const Joi = require('joi');

const userService = require('../service/userService');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least {#limit} characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least {#limit} characters long',
  }),
  image: Joi.string(),
});

const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.emailVerify(email);

  if (user) return res.status(409).json({ message: 'User already registered' });
  next();
};

module.exports = { userValidation, emailValidation };