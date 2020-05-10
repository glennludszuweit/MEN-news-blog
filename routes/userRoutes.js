const express = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgetPassword', authController.forgetPassword);
router.post('/resetPassword', authController.resetPassword);

router.get(
  '/',
  authController.protectRoute,
  authController.restrictRouteTo('admin'),
  usersController.getAllUsers
);
router.post('/', usersController.createUser);
router.get(
  '/:id',
  authController.protectRoute,
  authController.restrictRouteTo('admin', 'user'),
  usersController.getUser
);
router.patch(
  '/:id',
  authController.protectRoute,
  authController.restrictRouteTo('admin', 'user'),
  usersController.updateUser
);
router.delete(
  '/:id',
  authController.protectRoute,
  authController.restrictRouteTo('admin', 'user'),
  usersController.deleteUser
);

module.exports = router;
