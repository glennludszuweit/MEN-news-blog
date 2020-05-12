const Comment = require('../models/Comment');
const CatchAsync = require('../utils/CatchAsync');

module.exports = {
  getAllComments: CatchAsync(async (req, res, next) => {
    const comments = await Comment.find();

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments,
      },
    });
  }),

  creatComment: CatchAsync(async (req, res, next) => {
    const newComment = await Comment.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        comments: newComment,
      },
    });
  }),
};
