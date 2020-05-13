const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');

module.exports = {
  createOne: (Model) =>
    CatchAsync(async (req, res, next) => {
      const doc = await Model.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          post: doc,
        },
      });
    }),

  updateOne: (Model) =>
    CatchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(new AppError('Document not found.', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    }),

  deleteOne: (Model) =>
    CatchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(new AppError('Document not found.', 404));
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }),
};
