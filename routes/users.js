const router = require('express').Router();
const { getMe, updateUser } = require('../conrollers/users');
const { checkUpdateUser } = require('../middlewares/checkData');

router.get('/me', getMe);
router.patch('/me', checkUpdateUser, updateUser);

module.exports = router;
