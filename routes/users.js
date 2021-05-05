const router = require('express').Router();
const { getMe, updateUser } = require('../conrollers/users');

router.get('/me', getMe);
router.patch('/me', updateUser);

module.exports = router;
