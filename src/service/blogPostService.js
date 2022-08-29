const { BlogPost, PostCategory, Category } = require('../database/models');

const categoryVerify = async (categoryId) => {
  const result = await Category.findByPk(categoryId);
  return result;
};

const addPostCategory = async ({ categoryIds, postId }) => {
  const categoryIdsAndPostIds = categoryIds.map((categoryId) => ({ postId, categoryId }));
  PostCategory.bulkCreate(categoryIdsAndPostIds);
};

const createPost = async ({ userId, title, content, categoryIds }) => {
  const result = await BlogPost.create({ title, content, userId });
  addPostCategory({ categoryIds, postId: result.id });
  return result;
};

module.exports = { createPost, categoryVerify };