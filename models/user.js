const mongoose = require('mongoose');
const { emailValidator } = require('../utils/validators');
const { validationErrorMsg } = require('../utils/errorMessages');

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

module.exports = mongoose.model('user', userSchema);
