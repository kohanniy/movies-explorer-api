const mongoose = require('mongoose');
const { validationErrorMsg } = require('../utils/errorMessages');
const { urlValidator } = require('../helpers/validators');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
  },
  director: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
  },
  duration: {
    type: Number,
    required: [true, validationErrorMsg.requiredField],
  },
  year: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
  },
  description: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
  },
  image: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
    validate: {
      validator: urlValidator,
      message: validationErrorMsg.invalidURL,
    },
  },
  trailer: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
    validate: {
      validator: urlValidator,
      message: validationErrorMsg.invalidURL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
    validate: {
      validator: urlValidator,
      message: validationErrorMsg.invalidURL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
  },
  nameEN: {
    type: String,
    required: [true, validationErrorMsg.requiredField],
  },
});

module.exports = mongoose.model('movie', movieSchema);
