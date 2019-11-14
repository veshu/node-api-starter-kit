const httpStatus = require('http-status-codes');
const userService = require('../services/user.service');

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(httpStatus.CREATED);
    res.json(user);
  } catch (e) {
    next(e);
  }
};

/**
 * Searches the new user
 */
exports.search = async (req, res) => {
  const items = await userService.search(req.query);
  res.json(items);
};


exports.remove = async (req, res, next) => {
  try {
    await userService.remove(req.params.id);
    res.end();
  } catch (e) {
    next(e);
  }
};
