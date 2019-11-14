const express = require('express');
const validate = require('express-validation');
const {
  login,
  register,
} = require('../validations/auth.validation');

const controller = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/login')
  .post(validate(login), controller.login);

router
  .route('/register')
  .post(validate(register), controller.register);

module.exports = router;
