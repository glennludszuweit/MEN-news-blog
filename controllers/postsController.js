const Post = require('../models/Post');

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
          posts,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: 'Missing data',
      });
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          post,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          post: newPost,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid data',
      });
    }
  },

  updatePost: async (req, res) => {
    try {
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
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  },
};
