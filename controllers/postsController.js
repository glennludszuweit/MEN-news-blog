const Post = require('../models/Post');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

module.exports = {
  getAllPosts: catchAsync(async (req, res) => {
    //Execute query
    const features = new APIFeatures(Post.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const posts = await features.query;

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  }),

  getPost: catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  }),

  createPost: catchAsync(async (req, res) => {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  }),

  updatePost: catchAsync(async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  }),

  deletePost: catchAsync(async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};
