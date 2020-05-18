const express = require('express');
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:id/comments', commentRouter);

router.get('/', postsController.getAllPosts);

router.post('/', authController.protectRoute, postsController.createPost);

router.get('/:id', postsController.getPost);

router.patch(
  '/:id',
  authController.protectRoute,
  authController.restrictRouteTo('admin', 'user'),
  postsController.updatePost
);

router.delete('/:id', authController.protectRoute, postsController.deletePost);

module.exports = router;
