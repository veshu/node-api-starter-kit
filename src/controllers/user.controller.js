const httpStatus = require('http-status-codes');
const service = require('../services/user.service');

// create
exports.create = async (req, res, next) => {
  try {
    const user = await service.create(req.body);
    res.status(httpStatus.CREATED);
    res.json(user);
  } catch (e) {
    next(e);
  }
};

// search
exports.search = async (req, res, next) => {
  try {
    const items = await service.search(req.query);
    res.json(items);
  } catch (e) {
    next(e);
  }
};

// remove
exports.remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    res.end();
  } catch (e) {
    next(e);
  }
};

// get single
exports.getOne = async (req, res, next) => {
  try {
    const item = await service.getById(req.params.id);
    res.json(item);
  } catch (e) {
    next(e);
  }
};

// update
exports.update = async (req, res, next) => {
  try {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  } catch (e) {
    next(e);
  }
};
