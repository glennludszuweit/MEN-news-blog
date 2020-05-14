const Post = require('../models/Post');
const CatchAsync = require('../utils/CatchAsync');

module.exports = {
  indexPage: CatchAsync(async (req, res) => {
    //get DATA from collection
    const posts = await Post.find();

    //add template
    //render template
    res.status(200).render('index', {
      title: 'Welcome to News Blog',
      posts,
    });
  }),

  postPage: (req, res) => {
    res.status(200).render('post', {
      title: 'Post Title',
    });
  },

  authPage: (req, res) => {
    res.status(200).render('auth', {
      title: 'Login or Register',
    });
  },

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
      title: 'Sport',
      posts,
    });
  }),
};
