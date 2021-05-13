const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../conrollers/movies');
const { checNewMovie, checkMovieId } = require('../middlewares/checkData');

router.get('/', getMovies);
router.post('/', checNewMovie, createMovie);
router.delete('/:movieId', checkMovieId, deleteMovie);

module.exports = router;
