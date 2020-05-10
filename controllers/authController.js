const User = require('../models/User');
const CatchAsync = require('../utils/CatchAsync');

module.exports = {
  signup: CatchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  }),
};
