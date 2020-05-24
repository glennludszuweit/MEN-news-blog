const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/User');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
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

/////OBJECT FILTER/////
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

module.exports = {
  getProfile: (req, res, next) => {
    req.params.id = req.user.id;
    next();
  },

  uploadUserImg: upload.single('profileImg'),

  resizeUserImg: CatchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toFile(`public/images/users/${req.file.filename}`);

    next();
  }),

  updateProfile: CatchAsync(async (req, res, next) => {
    //create error if user post password data
    if (req.body.password || req.body.confirmPassword) {
      return next(
        new AppError(
          'This route is not for updating password. Please goto /updateMyPassword',
          400
        )
      );
    }
    //update user document
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.profileImg = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }),

  deleteProfile: CatchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {
      active: false,
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),

  //Create
  createUser: factory.updateOne(User),
  //Read
  getAllUsers: factory.getAll(User),
  getUser: factory.getOne(User),
  //Update
  updateUser: factory.updateOne(User),
  //Delete
  deleteUser: CatchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError('Document not found.', 404));
    }
    if (req.user.role === 'admin') {
      res.redirect('back');
    }
    if (req.user.role === 'user') {
      res.redirect('/');
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};
