const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
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
});


module.exports = mongoose.model('User', userSchema);
