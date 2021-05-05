const User = require('../models/user');
const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const { requestErrors } = require('../utils/errorMessages');

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(requestErrors.notFound.user);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === requestErrors.notFoundId.errName) {
        const error = new NotFoundError(requestErrors.notFoundId.user);
        next(error);
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(requestErrors.notFound.user);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === requestErrors.validation.errName) {
        const error = new BadRequestError(requestErrors.validation.message);
        next(error);
      }
      if (err.name === requestErrors.notFoundId.errName) {
        const error = new NotFoundError(requestErrors.notFoundId.user);
        next(error);
      }
      next(err);
    });
};

module.exports = {
  getMe,
  updateUser,
};
