const fs = require('fs');
const express = require('express');

// const postsController = require('./controllers/postsController');

const app = express();

app.use(express.json());

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/posts-simple.json`)
);

//Controllers
const getAllPosts = (req, res) => {
  res.status(200).json({
    status: 'success',
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

//Routes
app.get('/api/v1/posts', getAllPosts);
app.post('/api/v1/posts', createPost);

app.get('/api/v1/posts/:id', getPost);
app.patch('/api/v1/posts/:id', updatePost);
app.delete('/api/v1/posts/:id', deletePost);

// app.route('/api/v1/posts').get(getAllPosts).post(createPost);
// app
//   .route('/api/v1/posts/:id')
//   .get(getPost)
//   .patch(updatePost)
//   .delete(deletePost);

//Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
