const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');
const Post = require('../models/Post');
const factory = require('./handlerFactory');

/////MULTER/////
const multerStorage = multer.memoryStorage();
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
  // postCoverImg: upload.single('coverImage'),

  // //upload content images
  // postContentImgs: upload.array('images'),

  uploadPostImgs: upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 2 },
  ]),

  resizePostImg: (req, res, next) => {
    console.log(req.files);
    // if (!req.file) return next();

    // req.file.filename = `user-${Date.now()}.jpeg`;

    // sharp(req.file.buffer).toFile(`public/images/posts/${req.file.filename}`);

    next();
  },

  //Create
  createPost: CatchAsync(async (req, res, next) => {
    const postsParams = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      description: req.body.description,
      introduction: req.body.introduction,
      content: req.body.content,
    };

    // if (req.file) postsParams.coverImage = req.file.filename;
    const newPost = await Post.create(postsParams);
    res.status(201).json({
      status: 'success',
      data: {
        newPost,
      },
    });
  }),

  //Read
  getAllPosts: factory.getAll(Post),
  getPost: factory.getOne(Post, { path: 'comments' }),
  //Update
  updatePost: factory.updateOne(Post),
  //Delete
  deletePost: factory.deleteOne(Post),
};
