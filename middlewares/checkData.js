const { celebrate, Joi } = require('celebrate');
const { regexToCheckURL } = require('../utils/constants');

const checkNewUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Введите валидный email-адрес')
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Пароль должен быть не меньше 8 символов',
        'any.required': 'Это поле должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля - 2 символа',
        'string.max': 'Максимальная длина поля - 30 символов',
        'any.required': 'Это поле должно быть заполнено',
      }),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Введите валидный email-адрес')
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Пароль должен быть не меньше 8 символов',
        'any.required': 'Это поле должно быть заполнено',
      }),
  }),
});

const checkUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Введите валидный email-адрес')
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля - 2 символа',
        'string.max': 'Максимальная длина поля - 30 символов',
        'any.required': 'Это поле должно быть заполнено',
      }),
  }),
});

const checNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    image: Joi.string().required().pattern(regexToCheckURL)
      .messages({
        'string.pattern.base': 'Ссылка должна быть валидным URL-адресом',
      }),
    trailer: Joi.string().required().pattern(regexToCheckURL)
      .messages({
        'string.pattern.base': 'Ссылка должна быть валидным URL-адресом',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
    thumbnail: Joi.string().required().pattern(regexToCheckURL)
      .messages({
        'string.pattern.base': 'Ссылка должна быть валидным URL-адресом',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
  }),
});

const checkMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required()
      .messages({
        'any.required': 'Это поле должно быть заполнено',
      }),
  }),
});

module.exports = {
  checkNewUser,
  checkLogin,
  checkUpdateUser,
  checNewMovie,
  checkMovieId,
};
