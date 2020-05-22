const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

module.exports = {
  //////////MAIN PAGES//////////
  indexPage: CatchAsync(async (req, res, next) => {
    //get DATA from collection
    const posts = await Post.find().limit(9).sort({ createdAt: -1 });
    //add template
    //render template
    res.status(200).render('index', {
      title: 'News Blog',
      posts,
    });
  }),

  postPage: CatchAsync(async (req, res, next) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate({
      path: 'comments',
      fields: 'comment user',
    });
    if (!post) {
      return next(new AppError('Post not found!', 404));
    }
    res.status(200).render('post', {
      title: `${post.category} | ${post.title}`,
      post,
    });
  }),

  authPage: (req, res) => {
    res.status(200).render('auth', {
      title: 'Login or Register',
    });
  },

  contact: CatchAsync(async (req, res) => {
    //render template
    res.status(200).render('contact', {
      title: 'Contact Us',
    });
  }),

  about: CatchAsync(async (req, res) => {
    //render template
    res.status(200).render('about', {
      title: 'About Us',
    });
  }),

  //////////CATEGORIES//////////
  polotics: CatchAsync(async (req, res) => {
    //get DATA from collection
    const posts = await Post.find({
      category: 'Politics',
    });
    //add template
    //render template
    res.status(200).render('politics', {
      title: 'Politics',
      posts,
    });
  }),

  tech: CatchAsync(async (req, res) => {
    //get DATA from collection
    const posts = await Post.find({
      category: 'Technology',
    });
    //add template
    //render template
    res.status(200).render('tech', {
      title: 'Technology',
      posts,
    });
  }),

  entertainment: CatchAsync(async (req, res) => {
    //get DATA from collection
    const posts = await Post.find({
      category: 'Entertainment',
    });
    //add template
    //render template
    res.status(200).render('entertainment', {
      title: 'Entertainment',
      posts,
    });
  }),

  travel: CatchAsync(async (req, res) => {
    //get DATA from collection
    const posts = await Post.find({
      category: 'Travel',
    });
    //add template
    //render template
    res.status(200).render('travel', {
      title: 'Travel',
      posts,
    });
  }),

  sports: CatchAsync(async (req, res) => {
    //get DATA from collection
    const posts = await Post.find({
      category: 'Sport',
    });
    //add template
    //render template
    res.status(200).render('sports', {
      title: 'Sports',
      posts,
    });
  }),

  //USERS
  account: CatchAsync(async (req, res) => {
    //render template
    res.status(200).render('user/account', {
      title: 'Account',
    });
  }),

  newPost: CatchAsync(async (req, res) => {
    //render template
    res.status(200).render('user/newPost', {
      title: 'Add New Posts',
    });
  }),

  editPost: CatchAsync(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    //render template
    res.status(200).render('user/editPost', {
      title: 'Edit Post',
      post,
    });
  }),

  userPosts: CatchAsync(async (req, res) => {
    const posts = await Post.find({ user: req.user._id });
    //render template
    res.status(200).render('user/posts', {
      title: 'Your Posts',
      posts,
    });
  }),

  userComments: CatchAsync(async (req, res) => {
    const comments = await Comment.find({ user: req.user._id });
    //render template
    res.status(200).render('user/comments', {
      title: 'Your Comments',
      comments,
    });
  }),

  allUsers: CatchAsync(async (req, res) => {
    const users = await User.find();
    //render template
    res.status(200).render('admin/users', {
      title: 'All Users',
      users,
    });
  }),

  allComments: CatchAsync(async (req, res) => {
    //render template
    res.status(200).render('admin/comments', {
      title: 'All Comments',
    });
  }),

  allPosts: CatchAsync(async (req, res) => {
    //render template
    const posts = await Post.find();
    res.status(200).render('admin/posts', {
      title: 'All Posts',
      posts,
    });
  }),
};
