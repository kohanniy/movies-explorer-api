const { celebrate, Joi } = require('celebrate');
const { regexToCheckURL } = require('../utils/constants');

const checkNewUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const checNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexToCheckURL),
    trailer: Joi.string().required().pattern(regexToCheckURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(regexToCheckURL),
    movieId: Joi.number().required(),
  }),
});

const checkMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
});

module.exports = {
  checkNewUser,
  checkLogin,
  checkUpdateUser,
  checNewMovie,
  checkMovieId,
};
