'use strict';

module.exports = {
  getAllPosts: (req, res) => {
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  },

  getPost: (req, res) => {
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
        posts,
      },
    });
  },

  createPost: (req, res) => {
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
  },

  updatePost: (req, res) => {
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
  },

  deletePost: (req, res) => {
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
  },
};
