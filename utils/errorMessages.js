const validationErrorMsg = {
  requiredField: 'Это поле обязательно для заполнения',
  invalidEmail: 'Недопустимый email-адрес',
  invalidPassword: 'Пароль должен состоять минимум из 8 символов',
  shortName: 'Имя не должно быть короче 2-х символов',
  longName: 'Имя должно быть короче 30 символов',
  invalidURL: 'Недопустимый URL',
};

const requestErrors = {
  notFound: {
    errName: 'DocumentNotFoundError',
    user: 'Пользователь не найден',
    movie: 'Фильм не найден',
    url: 'Запрашиваемый ресурс не найден',
  },
  notFoundId: {
    errName: 'CastError',
    user: 'Нет пользователя с таким id',
    movie: 'Нет фильма с таким id',
  },
  validation: {
    errName: 'ValidationError',
    message: 'Переданы неверные данные',
  },
  conflict: {
    errName: 'MongoError',
    mongoErrorCode: 11000,
    message: 'Пользователь с данным e-mail уже зарегистрирован',
  },
  forbidden: {
    message: 'Вы не можете удалять карточки других пользователей',
  },
};

module.exports = {
  validationErrorMsg,
  requestErrors,
};
