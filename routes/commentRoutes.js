const express = require('express');
const commentsController = require('../controllers/commentsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.get('/', commentsController.getAllComments);

router.post('/', authController.protectRoute, commentsController.createComment);

router.patch(
  '/:id',
  authController.protectRoute,
  commentsController.updateComment
);

router.delete(
  '/:id',
  authController.protectRoute,
  commentsController.deleteComment
);

module.exports = router;
