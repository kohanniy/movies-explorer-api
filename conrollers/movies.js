const Movie = require('../models/movie');
const { requestErrors, movieDelConfirmMsg } = require('../utils/errorMessages');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const ForbiddenError = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === requestErrors.validation.errName) {
        const error = new BadRequestError(requestErrors.validation.message);
        next(error);
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(requestErrors.notFound.movie);
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(requestErrors.forbidden.message);
      }

      return movie.remove()
        .then(() => res.send({ message: movieDelConfirmMsg }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === requestErrors.notFoundId.errName) {
        const error = new NotFoundError(requestErrors.notFoundId.movie);
        next(error);
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
