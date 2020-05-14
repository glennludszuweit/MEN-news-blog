const express = require('express');
const viewsController = require('../controllers/vewsController');

const router = express.Router();

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
