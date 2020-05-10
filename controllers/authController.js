const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = {
  signup: CatchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  }),

  login: CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //check if email & password exist
    if (!email || !password) {
      return next(new AppError('Please enter email and password', 400));
    }
    //check if user exist and password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
    //send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  }),
};
