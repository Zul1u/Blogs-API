const { BlogPost, PostCategory, Category, User } = require('../database/models');

const categoryVerify = async (categoryId) => {
  const category = await Category.findByPk(categoryId);
  return category;
};

const addPostCategory = async ({ categoryIds, postId }) => {
  const categoryIdsAndPostIds = categoryIds.map((categoryId) => ({ postId, categoryId }));
  PostCategory.bulkCreate(categoryIdsAndPostIds);
};

const createPost = async ({ userId, title, content, categoryIds }) => {
  const newPost = await BlogPost.create({ title, content, userId });
  addPostCategory({ categoryIds, postId: newPost.id });
  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return allPosts;
};

module.exports = { createPost, categoryVerify, getAllPosts };