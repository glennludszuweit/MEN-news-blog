const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required.'],
  },
  profileImg: String,
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
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm password'],
    validate: {
      //works only on save & create
      validator: function (el) {
        return el === this.password;
      },
      messsage: 'Password mismatched!',
    },
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  //runs when new or updated password
  if (!this.isModified('password')) return next();
  //hash password
  this.password = await bcryptjs.hash(this.password, 12);
  //delete confirmPassword
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.afterChangedPassword = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    // eslint-disable-next-line radix
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  //Not changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
