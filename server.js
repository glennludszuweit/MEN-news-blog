const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const app = require('./app');

// console.log(process.env);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});