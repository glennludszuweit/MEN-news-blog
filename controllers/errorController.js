const AppError = require('../utils/AppError');

module.exports = {
  globalErrorHanlder: (error, req, res, next) => {
    console.log(error.stack);
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  },

  operationalErrorHandling: (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  },
};
