const loginService = require('../service/loginService');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await loginService.getUser({ email, password });
  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  next();
};

module.exports = validateLogin;