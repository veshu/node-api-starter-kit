const JoiBase = require('joi');
const JoiObjectId = require('joi-mongodb-objectid');

const Joi = JoiBase.extend(JoiObjectId);

module.exports = {

  list: {
    query: {
      page: Joi.number().min(1).default(1),
      perPage: Joi.number().min(1).max(100).default(10),
      handle: Joi.string(),
    },
  },

  create: {
    body: {
      handle: Joi.string().required(),
    },
  },

  deleteItem: {
    params: {
      id: Joi.objectId().required(),
    },
  },

  getItem: {
    params: {
      id: Joi.objectId().required(),
    },
  },

  update: {
    params: {
      id: Joi.objectId().required(),
    },
    body: {
      handle: Joi.string().required(),
    },
  },
};
