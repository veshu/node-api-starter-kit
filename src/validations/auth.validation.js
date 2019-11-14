const JoiBase = require('joi');
const JoiObjectId = require('joi-mongodb-objectid');

const Joi = JoiBase.extend(JoiObjectId);

module.exports = {
  login: {
    body: {
      handle: Joi.string().required(),
      password: Joi.string().min(6).max(128).required(),
    },
  },
  register: {
    body: {
      handle: Joi.string().required(),
      password: Joi.string().min(6).max(128).required(),
      confirmPassword: Joi.string(),
    },
  },
};
