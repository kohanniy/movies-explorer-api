const router = require('express').Router();
const moviesRouter = require('./movies');
const userRouter = require('./users');

router.use('/movies', moviesRouter);
router.use('/users', userRouter);

module.exports = router;
