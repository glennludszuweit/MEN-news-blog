/* eslint-disable node/no-unsupported-features/es-syntax */
const Post = require('../models/Post');

module.exports = {
  checkBody: (req, res, next) => {
    if (!req.body.title || !req.body.content) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing Title or Content',
      });
    }
    next();
  },

  getAllPosts: (req, res) => {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      // results: posts.length,
      // data: {
      //   posts,
      // },
    });
  },

  getPost: (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    // const post = posts.find((el) => el.id === id);
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     post,
    //   },
    // });
  },

  createPost: (req, res) => {
    res.status(201).json({
      status: 'success',
      // data: {
      //   post: newPost,
      // },
    });
  },

  updatePost: (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated>',
      },
    });
  },

  deletePost: (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
};
