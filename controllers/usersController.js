const User = require('../models/User');
// const APIFeatures = require('../utils/ApiFeatures');
const CatchAsync = require('../utils/CatchAsync');

module.exports = {
  getAllUsers: CatchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  }),

  getUser: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Route not yet ready.',
    });
  },

  createUser: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Route not yet ready.',
    });
  },

  updateUser: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Route not yet ready.',
    });
  },

  deleteUser: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Route not yet ready.',
    });
  },
};
