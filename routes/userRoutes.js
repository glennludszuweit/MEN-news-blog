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

router.patch(
  '/updateMe',
  authController.protectRoute,
  usersController.updateMe
);

router.delete(
  '/deleteMe',
  authController.protectRoute,
  usersController.deleteMe
);

router.get(
  '/',
  // authController.protectRoute,
  // authController.restrictRouteTo('admin'),
  usersController.getAllUsers
);

router.post('/', usersController.createUser);

router.get(
  '/:id',
  authController.protectRoute,
  authController.restrictRouteTo('admin', 'user'),
  usersController.getUser
);

router.patch('/:id', authController.protectRoute, usersController.updateUser);

router.delete('/:id', authController.protectRoute, usersController.deleteUser);

module.exports = router;
