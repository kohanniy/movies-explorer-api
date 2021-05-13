const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailValidator } = require('../helpers/validators');
const { validationErrorMsg, unauthorizedMsg } = require('../utils/errorMessages');
const AuthError = require('../errors/Auth');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
    unique: true,
    validate: {
      validator: emailValidator,
      message: validationErrorMsg.invalidEmail,
    },
  },
  password: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
    minlength: [8, validationErrorMsg.invalidPassword],
    select: false,
  },
  name: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
    minlength: [2, validationErrorMsg.shortName],
    maxlength: [30, validationErrorMsg.longName],
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(unauthorizedMsg.login);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(unauthorizedMsg.login);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
