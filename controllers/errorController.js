const AppError = require('../utils/AppError');

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (error) => {
  const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(' ')}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = (error) =>
  new AppError('Invalid token. Please try again.', 401);

const handleTokenExpiredError = (error) =>
  new AppError('Token is expired. Please try again.', 401);

const errorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const errorProd = (error, res) => {
  //Operational error for client
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
    //Programming error not for client
  } else {
    //log error
    console.error('ERROR', error);
    //client generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = {
  globalErrorHanlder: (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
      errorDev(error, res);
    } else if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      let err = { ...error };

      if (err.name === 'CastError') err = handleCastErrorDB(err);
      if (err.code === 11000) err = handleDuplicateFieldDB(err);
      if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
      if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenError(err);
      if (err.name === 'TokenExpiredError') err = handleTokenExpiredError(err);

      errorProd(err, res);
    }
  },

  operationalErrorHandling: (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  },
};
