const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: '.env' });

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo connection established'));

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is needed.'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description for this topic.'],
  },
  content: {
    type: String,
    required: [true, 'An article must have contents.'],
  },
  author: {
    type: String,
    required: [true, 'Who is the author?'],
  },
  category: {
    type: String,
    required: [true, 'Please select category'],
  },
});

const Post = mongoose.model('Post', postSchema);

const testPost = new Post({
  title: 'Node JS',
  description: 'Node JS tutorial',
  content: 'The only tutorial you need to master node JS!',
  author: 'Glenn Ludszuweit',
  category: 'Technology',
});

testPost
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((error) => {
    console.log(error.message);
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
