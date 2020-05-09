const AppError = require('../utils/AppError');

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

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
      errorProd(err, res);
    }
  },

  operationalErrorHandling: (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  },
};
