const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a Post.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must have a User.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.remove(/^find/, function (next) {
  this.populate({
    path: 'post',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name profileImg',
  });
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
