const express = require('express');
const viewsController = require('../controllers/veiwsController');
const authController = require('../controllers/authController');

const router = express.Router();

//USERS
router.get('/account', authController.protectRoute, viewsController.account);

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
