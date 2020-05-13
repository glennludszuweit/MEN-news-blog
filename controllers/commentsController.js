const Comment = require('../models/Comment');
const CatchAsync = require('../utils/CatchAsync');
const factory = require('./handlerFactory');

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

  setPostUserIds: (req, res, next) => {
    if (!req.body.post) req.body.post = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  },

  createComment: factory.createOne(Comment),
  updateComment: factory.updateOne(Comment),
  deleteComment: factory.deleteOne(Comment),
};
