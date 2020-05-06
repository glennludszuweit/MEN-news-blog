const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.param('id', postsController.checkId);

router.get('/', postsController.getAllPosts);

router.post('/', postsController.checkBody, postsController.createPost);

router.get('/:id', postsController.getPost);

router.patch('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

module.exports = router;
