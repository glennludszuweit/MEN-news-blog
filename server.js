const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXEPTION');
  console.log(error);
  process.exit(1);
});

dotenv.config({ path: '.env' });
const app = require('./app');

mongoose
  .connect(process.env.MONGODB || 'mongodb://localhost:27017/newsblog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo connection established'));

const port = process.env.PORT || 11000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (error) => {
  console.log('UNHANDLED REJECTION');
  console.log(error);
  server.close(() => {
    process.exit(1);
  });
});
