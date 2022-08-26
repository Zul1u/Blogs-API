const { createToken } = require('../helpers/token');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const payload = { email, password };
  const token = createToken(payload);

  return res.status(200).json({ token });
};
