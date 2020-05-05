const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

// const postsController = require('./controllers/postsController');

const app = express();

//Middlwares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello Middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/posts-simple.json`)
);

//Posts Controllers
const getAllPosts = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: posts.length,
    data: {
      posts,
    },
  });
};
const getPost = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  if (id > posts.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  const post = posts.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
};
const createPost = (req, res) => {
  const newId = posts[posts.length - 1].id + 1;
  const newPost = Object.assign({ id: newId }, req.body);
  posts.push(newPost);
  fs.writeFile(
    `${__dirname}/dev-data/data/posts-simple.json`,
    JSON.stringify(posts),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          post: newPost,
        },
      });
    }
  );
};
const updatePost = (req, res) => {
  if (req.params.id * 1 > posts.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated>',
    },
  });
};
const deletePost = (req, res) => {
  if (req.params.id * 1 > posts.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//Users Controller
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet ready.',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet ready.',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet ready.',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet ready.',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet ready.',
  });
};

//Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

//Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
