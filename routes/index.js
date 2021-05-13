const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFound');
const { requestErrors } = require('../utils/errorMessages');
const { createUser, login } = require('../conrollers/users');
const { checkNewUser, checkLogin } = require('../middlewares/checkData');
const auth = require('../middlewares/auth');

router.post('/signup', checkNewUser, createUser);
router.post('/signin', checkLogin, login);

router.use(auth);
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);
router.all('*', () => {
  throw new NotFoundError(requestErrors.notFound.url);
});

module.exports = router;
