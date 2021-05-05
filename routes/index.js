const router = require('express').Router();
const moviesRouter = require('./movies');
const userRouter = require('./users');
const { createUser, login } = require('../conrollers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/movies', auth, moviesRouter);
router.use('/users', auth, userRouter);

module.exports = router;
