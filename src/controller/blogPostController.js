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

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await blogPostService.getAllPosts();

    return res.status(200).json(allPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getByPk = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await blogPostService.getByPk(id);

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await blogPostService.updatePost({ id, title, content });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getAllPosts, getByPk, updatePost };