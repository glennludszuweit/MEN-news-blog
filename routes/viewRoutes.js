const express = require('express');
const viewsController = require('../controllers/veiwsController');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');
const usersController = require('../controllers/usersController');

const router = express.Router();

//USERS
router.get('/account', authController.protectRoute, viewsController.account);
router.get('/new-post', authController.protectRoute, viewsController.newPost);
router.get(
  '/edit-post/:id',
  authController.protectRoute,
  viewsController.editPost
);
router.get('/my-posts', authController.protectRoute, viewsController.userPosts);
router.get(
  '/my-comments',
  authController.protectRoute,
  viewsController.userComments
);

//ADMIN
router.get(
  '/all-users',
  authController.protectRoute,
  authController.restrictRouteTo('admin'),
  viewsController.allUsers,
  usersController.getUser
);
router.get(
  '/all-posts',
  authController.protectRoute,
  authController.restrictRouteTo('admin'),
  // postsController.getAllPosts,
  viewsController.allPosts
);
router.get(
  '/all-comments',
  authController.protectRoute,
  authController.restrictRouteTo('admin'),
  viewsController.allComments
);

//Home
router.get('/', authController.isLoggedIn, viewsController.indexPage);
router.get('/logout', authController.isLoggedIn, authController.logout);
router.get('/contact', authController.isLoggedIn, viewsController.contact);
router.get('/about', authController.isLoggedIn, viewsController.about);

//Post details
router.get('/posts/:slug', authController.isLoggedIn, viewsController.postPage);

//Authentication
router.get('/auth', authController.isLoggedIn, viewsController.authPage);

//Categories
router.get('/politics', authController.isLoggedIn, viewsController.polotics);
router.get('/tech', authController.isLoggedIn, viewsController.tech);
router.get(
  '/entertainment',
  authController.isLoggedIn,
  viewsController.entertainment
);
router.get('/travel', authController.isLoggedIn, viewsController.travel);
router.get('/sports', authController.isLoggedIn, viewsController.sports);

module.exports = router;
