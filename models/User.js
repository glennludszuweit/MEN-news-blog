const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: validator.isAlphanumeric,
  },
  profileImg: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
