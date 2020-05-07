const fs = require('fs');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const Post = require('../../models/Post');

// dotenv.config({ path: '../../.env' });

mongoose
  .connect('mongodb://localhost:27017/newsblog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo connection established'));

// READ JSON FILE
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/posts-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Post.create(posts);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
