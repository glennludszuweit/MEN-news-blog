const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/posts-simple.json`)
);

app.get('/api/v1/posts', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

app.get('/api/v1/posts/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  if (id > posts.length) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid Id' });
  }
  const post = posts.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

app.post('/api/v1/posts', (req, res) => {
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
});

//Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
