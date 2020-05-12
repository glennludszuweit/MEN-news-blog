const Comment = require('../models/Comment');
const CatchAsync = require('../utils/CatchAsync');

module.exports = {
  getAllComments: CatchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) filter = { post: req.params.id };
    const comments = await Comment.find(filter);

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments,
      },
    });
  }),

  createComment: CatchAsync(async (req, res, next) => {
    if (!req.body.post) req.body.post = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;
    const newComment = await Comment.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        comments: newComment,
      },
    });
  }),
};
