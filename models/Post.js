const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is needed.'],
      unique: true,
      maxlength: [40, 'Title must have a maximum of 40 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description for this topic.'],
    },
    introduction: {
      type: String,
      required: [true, 'An article must have introduction.'],
    },
    content: {
      type: String,
      required: [true, 'An article must have contents.'],
    },
    author: {
      type: String,
      required: [true, 'Who is the author?'],
    },
    slug: String,
    category: {
      type: String,
      required: [true, 'Please select category.'],
      enum: {
        values: ['Politics', 'Technology', 'Entertainment', 'Travel', 'Sport'],
        message: 'Category not found.',
      },
    },
    coverImage: {
      type: String,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Index
postSchema.index({ slug: 1 });

//Virtual populate comments
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

//Slugify
postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
