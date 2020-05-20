const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');
const ApiFeatures = require('../utils/ApiFeatures');

module.exports = {
  //CREATE
  createOne: (Model) =>
    CatchAsync(async (req, res, next) => {
      if (req.file) req.body.coverImage = req.file.filename;
      const doc = await Model.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          post: doc,
        },
      });
    }),

  //READ
  getAll: (Model) =>
    CatchAsync(async (req, res, next) => {
      //Allow nested GET for comments
      let filter = {};
      if (req.params.id) filter = { post: req.params.id };
      //Execute query
      const features = new ApiFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const doc = await features.query;
      res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
          data: doc,
        },
      });
    }),
  getOne: (Model, populateOpt) =>
    CatchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (populateOpt) query = query.populate(populateOpt);
      const doc = await query;
      if (!doc) {
        return next(new AppError('Post not found.', 404));
      }
      res.status(200).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    }),

  //UPDATE
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

  //DELETE
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
