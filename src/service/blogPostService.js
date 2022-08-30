const { Op } = require('sequelize');

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

const getByPk = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePost = async ({ id, title, content }) => {
  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await getByPk(id);

  return updatedPost;
};

const deletePost = async (id) => BlogPost.destroy({ where: { id } });

const search = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = {
  createPost,
  categoryVerify,
  getAllPosts,
  getByPk,
  updatePost,
  deletePost,
  search,
};