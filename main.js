const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
