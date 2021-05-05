const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const { requestErrors } = require('../utils/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { errName, mongoErrorCode, message } = requestErrors.conflict;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      const { _id, email, name } = user;
      res.status(201).send({ _id, email, name });
    })
    .catch((err) => {
      if (err.name === errName || err.code === mongoErrorCode) {
        const error = new ConflictError(message);
        next(error);
      }
      if (err.name === requestErrors.validation.errName) {
        const error = new BadRequestError(requestErrors.validation.message);
        next(error);
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

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
  createUser,
  login,
  getMe,
  updateUser,
};
