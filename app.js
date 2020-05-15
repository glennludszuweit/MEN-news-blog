const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');

const errorController = require('./controllers/errorController');

const viewRouter = require('./routes/viewRoutes');
const commentRouter = require('./routes/commentRoutes');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middlwares
//Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

//http security header
app.use(helmet());

//environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Rate limiting
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Try again in an hour.',
});
app.use('/api', limiter);

//Data sanitization for nosql query injection and xss
app.use(mongoSanitize());
app.use(xss());

//prevent params pollution
app.use(
  hpp({
    whitelist: ['title', 'author', 'category', 'createdAt'],
  })
);

//Body parser
app.use(express.json({}));
app.use(cookieParser());

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  // console.log(req.headers);
  next();
});

//API Routes
app.use('/', viewRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

//Error Handling Routes
app.all('*', errorController.operationalErrorHandling);
app.use(errorController.globalErrorHanlder);

module.exports = app;
