const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email already taken'],
    lowercase: true,
    validate: [validator.isEmail, 'Email invalid.'],
  },
  password: {
    type: String,
    required: [true, 'Passwordm required.'],
    validate: [
      validator.isAlphanumeric,
      'Only alphanumeric is accepted(a-z, 0-9).',
    ],
    minlength: [6, 'Password must have atleast 6 characters.'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm password'],
  },
  profileImg: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
