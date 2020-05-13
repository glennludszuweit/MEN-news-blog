const Post = require('../models/Post');
const factory = require('./handlerFactory');

module.exports = {
  //Create
  createPost: factory.createOne(Post),
  //Read
  getAllPosts: factory.getAll(Post),
  getPost: factory.getOne(Post, { path: 'comments' }),
  //Update
  updatePost: factory.updateOne(Post),
  //Delete
  deletePost: factory.deleteOne(Post),
};
