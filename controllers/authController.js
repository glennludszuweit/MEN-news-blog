const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const SendEmail = require('../utils/SendEmail');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
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

    createSendToken(newUser, 201, res);
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
    createSendToken(user, 200, res);
  }),

  protectRoute: CatchAsync(async (req, res, next) => {
    //Get token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('Access unauthorized, please login.', 401));
    }
    //Validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //Check if User still authorized
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('This user does not exist.', 401));
    }
    //Check if user changed password/token
    if (currentUser.afterChangedPassword(decoded.iat)) {
      return next(new AppError('Password changed. Please try again.', 401));
    }
    req.user = currentUser;
    next();
  }),

  restrictRouteTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new AppError('Permission deneid.', 403));
      }
      next();
    };
  },

  forgetPassword: CatchAsync(async (req, res, next) => {
    //get user by email
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return next(new AppError('User email does not exist.', 404));
    }

    //generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    //send token to email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Submit new password and confirm to: ${resetURL}`;
    try {
      await SendEmail({
        email: user.email,
        subject: 'NEWSBLOG - New Password (valid for 30mins).',
        message,
      });
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      console.log(error);
      return next(new AppError('Error occur sending email. Try again.', 500));
    }
  }),

  resetPassword: CatchAsync(async (req, res, next) => {
    //get user based on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    //if token is valid, set password
    if (!user) {
      return next(new AppError('Token is invalid or expired', 400));
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //update changedPasswordAt property
    //log user in, send JWT
    createSendToken(user, 200, res);
  }),

  updatePassword: CatchAsync(async (req, res, next) => {
    //get user from collection
    const user = await User.findById(req.user.id).select('+password');

    //check current password
    if (
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError('Current password did not match.', 401));
    }

    //update password
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    //log user in with new password
    createSendToken(user, 200, res);
  }),
};
