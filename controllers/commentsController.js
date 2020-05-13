const Comment = require('../models/Comment');
const factory = require('./handlerFactory');

module.exports = {
  setPostUserIds: (req, res, next) => {
    if (!req.body.post) req.body.post = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  },

  //Create
  createComment: factory.createOne(Comment),
  //Read
  getAllComments: factory.getAll(Comment),
  getComment: factory.getOne(Comment),
  //Update
  updateComment: factory.updateOne(Comment),
  //Delete
  deleteComment: factory.deleteOne(Comment),
};
