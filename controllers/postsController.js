const multer = require('multer');
const AppError = require('../utils/AppError');
const Post = require('../models/Post');
const factory = require('./handlerFactory');

/////MULTER/////
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/posts');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('File not an Image. Only image files accepted.', 400),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = {
  //upload cover image
  postCoverImg: upload.single('profileImg'),
  //Create
  createPost: factory.createOne(Post),
  //Read
  getAllPosts: factory.getAll(Post),
  getPost: factory.getOne(Post, { path: 'comments' }),
  //Update
  updatePost: factory.updateOne(Post),
  //Delete
  deletePost: factory.deleteOne(Post),
};
