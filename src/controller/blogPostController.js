const blogPostService = require('../service/blogPostService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  try {
    const newPost = await blogPostService.createPost({ userId, title, content, categoryIds });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost };