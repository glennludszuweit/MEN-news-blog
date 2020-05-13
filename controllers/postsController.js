const Post = require('../models/Post');
const APIFeatures = require('../utils/ApiFeatures');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

module.exports = {
  getAllPosts: CatchAsync(async (req, res, next) => {
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

  getPost: CatchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('comments');

    if (!post) {
      return next(new AppError('Post not found.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  }),

  createPost: factory.createOne(Post),
  updatePost: factory.updateOne(Post),
  deletePost: factory.deleteOne(Post),
};
