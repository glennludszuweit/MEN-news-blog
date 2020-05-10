const express = require('express');
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.protect, postsController.getAllPosts);

router.post('/', postsController.createPost);

router.get('/:id', postsController.getPost);

router.patch('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

module.exports = router;
