const User = require('../models/User');
// const APIFeatures = require('../utils/ApiFeatures');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

module.exports = {
  getAllUsers: CatchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  }),

  getUser: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Route not yet ready.',
    });
  },

  updateMe: CatchAsync(async (req, res, next) => {
    //create error if user post password data
    if (req.body.password || req.body.confirmPassword) {
      return next(
        new AppError(
          'This route is not for updating password. Please goto /updateMyPassword',
          400
        )
      );
    }
    //update user document
    const filteredBody = filterObj(req.body, 'name', 'email', 'profileImg');
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }),

  deleteMe: CatchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {
      active: false,
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),

  createUser: factory.updateOne(User),
  updateUser: factory.updateOne(User),
  deleteUser: factory.deleteOne(User),
};
