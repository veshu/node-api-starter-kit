const {
  omitBy,
  assign,
  isNil,
} = require('lodash');
const User = require('../models/user.model');
const errors = require('../common/APIError');
const helper = require('../common/helper');

/**
 * Create new user
 * @public
 */
exports.create = async (data) => {
  const count = await User.count({
    handle: data.handle,
  });
  if (count > 0) {
    throw errors.ValidationError([{
      field: 'handle',
      location: 'body',
      messages: ['"handle" already exists'],
    }]);
  }
  const item = new User(data);
  const savedItem = await item.save();
  return savedItem.transform();
};

exports.getById = async (id) => {
  const item = await helper.ensureIfExists(User, id);
  return item.transform();
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

  return items.map((item) => item.transform());
};

exports.update = async (id, data) => {
  let item = await helper.ensureIfExists(User, id);
  item = assign(item, data);
  const updated = await item.save();
  return updated.transform();
};

exports.remove = async (id) => {
  await helper.ensureIfExists(User, id);

  await User.deleteOne({
    _id: id,
  });
};

exports.login = async (username, password) => {
  const user = await User.findOne({
    handle: username,
  });
  console.log(user);
  if (user && await user.passwordMatches(password)) {
    console.log(user.toJSON().handle);
    return {
      token: user.token(),
      user: user.transform(),
    };
  }
  throw new errors.APIError({
    status: 401,
    message: 'Incorrect username or password',
  });
};

exports.register = async (data) => {
  const user = await (new User(data)).save();

  return {
    token: user.token(),
    user: user.transform(),
  };
};
