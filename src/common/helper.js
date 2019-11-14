const errors = require('./APIError');

exports.ensureIfExists = async (model, id) => {
  const item = await model.findById(id);
  if (!item) {
    throw errors.NotFoundError('The item doesn\'t exist');
  }
  return item;
};
