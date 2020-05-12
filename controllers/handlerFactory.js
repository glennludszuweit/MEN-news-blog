const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');

module.exports = {
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
