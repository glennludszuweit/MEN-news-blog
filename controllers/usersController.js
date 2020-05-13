const User = require('../models/User');
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

  //Create
  createUser: factory.updateOne(User),
  //Read
  getAllUsers: factory.getAll(User),
  getUser: factory.getOne(User),
  //Update
  updateUser: factory.updateOne(User),
  //Delete
  deleteUser: factory.deleteOne(User),
};
