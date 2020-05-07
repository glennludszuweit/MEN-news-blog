const Post = require('../models/Post');

module.exports = {
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
