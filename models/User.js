const crypto = require('crypto');
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
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

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
