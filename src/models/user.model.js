const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const config = require('config');
const jwt = require('jwt-simple');

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
}, {
  timestamps: false,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtual
 */
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'handle'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
  token() {
    const playload = {
      exp: moment().add(config.JwtExpirationMinute, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, config.jwtSecret);
  },
});


module.exports = mongoose.model('User', userSchema);
