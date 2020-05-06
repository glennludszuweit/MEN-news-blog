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
    required: [true, 'Please select category'],
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
