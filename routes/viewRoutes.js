const express = require('express');
const viewsController = require('../controllers/veiwsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/logout', authController.logout);
router.get('/contact', viewsController.contact);
router.get('/about', viewsController.about);

//USERS
router.get('/account', viewsController.account);

//Home
router.get('/', viewsController.indexPage);

//Post details
router.get('/posts/:slug', viewsController.postPage);

//Authentication
router.get('/auth', viewsController.authPage);

//Categories
router.get('/politics', viewsController.polotics);
router.get('/tech', viewsController.tech);
router.get('/entertainment', viewsController.entertainment);
router.get('/travel', viewsController.travel);
router.get('/sports', viewsController.sports);

module.exports = router;
