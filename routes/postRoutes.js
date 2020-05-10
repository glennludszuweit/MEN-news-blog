const express = require('express');
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', postsController.getAllPosts);

router.post('/', postsController.createPost);

router.get('/:id', postsController.getPost);

router.patch(
  '/:id',
  authController.protectRoute,
  authController.restrictRouteTo('admin', 'user'),
  postsController.updatePost
);

router.delete(
  '/:id',
  authController.protectRoute,
  authController.restrictRouteTo('admin'),
  postsController.deletePost
);

module.exports = router;
