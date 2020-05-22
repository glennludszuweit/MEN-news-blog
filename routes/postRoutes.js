const express = require('express');
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:id/comments', commentRouter);

router.get('/', postsController.getAllPosts);

router.post(
  '/',
  postsController.uploadPostImgs,
  postsController.resizePostImg,
  authController.protectRoute,
  postsController.setPostUserId,
  postsController.createPost
);

router.get('/:id', postsController.getPost);

router.patch(
  '/:id',
  authController.protectRoute,
  postsController.uploadPostImgs,
  postsController.resizePostImg,
  postsController.updatePost
);

router.delete('/:id', authController.protectRoute, postsController.deletePost);

module.exports = router;
