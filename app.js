const express = require('express');
const morgan = require('morgan');

const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middlwares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

//Error Handling Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorController.globalErrorHanlder);

module.exports = app;
