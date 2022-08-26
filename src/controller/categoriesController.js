const categoriesService = require('../service/categoriesService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await categoriesService.createCategory(name);

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCategory };