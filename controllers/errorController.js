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

const handleJsonWebTokenError = () =>
  new AppError('Invalid token. Please try again.', 401);

const handleTokenExpiredError = () =>
  new AppError('Token is expired. Please try again.', 401);

const errorDev = (error, req, res) => {
  //api
  if (req.originalUrl.startsWith('/api')) {
    res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
    //rendered page
  } else {
    console.error('ERROR', error);
    res.status(error.statusCode).render('error', {
      title: 'Something went wrong!',
      code: error.statusCode,
      msg: error.message,
    });
  }
};

const errorProd = (error, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
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
  } else {
    res.status(error.statusCode).render('error', {
      title: 'Something went wrong!',
      code: error.statusCode,
      msg: error.message,
    });
  }
};

module.exports = {
  globalErrorHanlder: (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
      errorDev(error, req, res);
    } else if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      let err = { ...error };
      err.message = error.message;
      if (err.name === 'CastError') err = handleCastErrorDB(err);
      if (err.code === 11000) err = handleDuplicateFieldDB(err);
      if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
      if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenError(err);
      if (err.name === 'TokenExpiredError') err = handleTokenExpiredError(err);

      errorProd(err, req, res);
    }
  },

  operationalErrorHandling: (req, res, next) => {
    next(new AppError(`Can't find page`, 404));
  },
};
