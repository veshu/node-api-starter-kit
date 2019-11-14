const {
  omitBy,
  isNil,
} = require('lodash');
const User = require('../models/user.model');
const errors = require('../common/APIError');


/**
 * Create new user
 * @public
 */
exports.create = async (data) => {
  if (await User.count({
      handle: data.handle,
    }) > 0) {
    throw errors.ValidationError([{
      field: 'handle',
      location: 'body',
      messages: ['"handle" already exists'],
    }]);
  }
  const user = new User(data);
  const savedUser = await user.save();
  return savedUser.transform();
};

/**
 * Searches the users
 * @public
 */
exports.search = async (options) => {
  const predicate = omitBy({
    handle: options.handle,
  }, isNil);

  const items = User.find(predicate)
    .skip(options.perPage * (options.page - 1))
    .limit(options.perPage)
    .exec();

  return items.map((user) => user.transform());
};


exports.remove = async (id) => {
  await User.findByIdAndDelete(id);
};
