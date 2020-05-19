const multer = require('multer');
const User = require('../models/User');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

/////MULTER/////
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users');
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

  updateProfile: CatchAsync(async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
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
    const filteredBody = filterObj(req.body, 'name', 'email', 'profileImg');
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
  deleteUser: factory.deleteOne(User),
};
