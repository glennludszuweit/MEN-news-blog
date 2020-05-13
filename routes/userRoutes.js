const express = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protectRoute,
  authController.updatePassword
);

router.get(
  '/profile',
  authController.protectRoute,
  usersController.getProfile,
  usersController.getUser
);
router.patch(
  '/updateProfile',
  authController.protectRoute,
  usersController.updateProfile
);
router.delete(
  '/deleteProfile',
  authController.protectRoute,
  usersController.deleteProfile
);

router.get(
  '/',
  // authController.protectRoute,
  // authController.restrictRouteTo('admin'),
  usersController.getAllUsers
);

router.post('/', usersController.createUser);

router.get('/:id', authController.protectRoute, usersController.getUser);

router.patch('/:id', authController.protectRoute, usersController.updateUser);

router.delete('/:id', authController.protectRoute, usersController.deleteUser);

module.exports = router;
