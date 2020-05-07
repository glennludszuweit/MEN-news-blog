const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is needed.'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description for this topic.'],
  },
  introduction: {
    type: String,
    required: [true, 'An article must have contents.'],
  },
  content: {
    type: String,
    required: [true, 'An article must have contents.'],
  },
  author: {
    type: String,
    required: [true, 'Who is the author?'],
  },
  category: {
    type: String,
    required: [true, 'Please select category.'],
  },
  coverImage: {
    type: String,
    required: [true, 'A posts must have a cover image.'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
