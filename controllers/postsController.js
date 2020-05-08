const Post = require('../models/Post');

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      //Build query
      //filtering
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
      //advance filter
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let query = Post.find(JSON.parse(queryStr));

      //Sorting
      if (req.query.sort) {
        // eslint-disable-next-line no-use-before-define
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }

      //Field Limiting
      if (req.query.fields) {
        // eslint-disable-next-line no-use-before-define
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
      } else {
        query = query.fields('-__v');
      }

      //Execute query
      const posts = await query;

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
        message: error.message,
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
