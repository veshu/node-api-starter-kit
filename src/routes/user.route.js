const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/user.controller');
const {
  list,
  create,
  deleteItem,
  getItem,
  update,
} = require('../validations/user.validation');

const router = express.Router();

router
  .route('/')
  .get(validate(list), controller.search)
  .post(validate(create), controller.create);
router
  .route('/:id')
  .delete(validate(deleteItem), controller.remove)
  .get(validate(getItem), controller.getOne)
  .put(validate(update), controller.update);

module.exports = router;
