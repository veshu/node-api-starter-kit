const service = require('../services/user.service');

exports.login = async (req, res, next) => {
  try {
    const result = await service.login(req.body.handle, req.body.password);
    console.log(result);
    res.json(result);
  } catch (e) {
    next(e);
  }
};


exports.register = async (req, res, next) => {
  try {
    const result = await service.register(req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
};
