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
    { name: 'contentImage1', maxCount: 1 },
    { name: 'contentImage2', maxCount: 1 },
  ]),

  resizePostImg: CatchAsync(async (req, res, next) => {
    if (
      !req.files.coverImage ||
      !req.files.contentImage1 ||
      !req.files.contentImage2
    )
      return next();

    //Cover image
    req.body.coverImage = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.coverImage[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toFile(`public/images/posts/${req.body.coverImage}`);

    req.body.contentImage1 = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.contentImage1[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toFile(`public/images/posts/${req.body.contentImage1}`);

    req.body.contentImage2 = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.contentImage2[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toFile(`public/images/posts/${req.body.contentImage2}`);

    //Images
    // req.body.images = [];
    // await Promise.all(
    //   req.files.images.map(async (file, i) => {
    //     const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
    //     await sharp(file.buffer)
    //       .toFormat('jpeg')
    //       .jpeg({ quality: 100 })
    //       .toFile(`public/images/posts/${filename}`);

    //     req.body.images.push(filename);
    //   })
    // );

    next();
  }),

  setPostUserId: (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
  },

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
