const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser, login } = require('../conrollers/users');
const { checkNewUser, checkLogin } = require('../middlewares/checkData');
const auth = require('../middlewares/auth');

router.post('/signup', checkNewUser, createUser);
router.post('/signin', checkLogin, login);

router.use('/movies', auth, moviesRouter);
router.use('/users', auth, usersRouter);

module.exports = router;
