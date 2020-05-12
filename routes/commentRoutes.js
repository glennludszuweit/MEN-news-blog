const express = require('express');
const commentsController = require('../controllers/commentsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', commentsController.getAllComments);

router.post('/', authController.protectRoute, commentsController.createComment);

module.exports = router;
