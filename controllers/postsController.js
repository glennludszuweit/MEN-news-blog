const fs = require('fs');

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/posts-simple.json`)
);

module.exports = {
  checkId: (req, res, next, val) => {
    console.log(`Post id is: ${val}`);
    if (req.params.id * 1 > posts.length) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Invalid Id',
      });
    }
    next();
  },

  checkBody: (req, res, next) => {
    if (!req.body.title || !req.body.content) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing Title or Content',
      });
    }
    next();
  },

  getAllPosts: (req, res) => {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: posts.length,
      data: {
        posts,
      },
    });
  },

  getPost: (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const post = posts.find((el) => el.id === id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  },

  createPost: (req, res) => {
    const newId = posts[posts.length - 1].id + 1;
    const newPost = Object.assign({ id: newId }, req.body);
    posts.push(newPost);
    fs.writeFile(
      `${__dirname}/../dev-data/data/posts-simple.json`,
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
  },

  updatePost: (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated>',
      },
    });
  },

  deletePost: (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
};
