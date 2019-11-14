const Joi = require('joi');

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
      id: Joi.string().required(),
    },
  },
};
