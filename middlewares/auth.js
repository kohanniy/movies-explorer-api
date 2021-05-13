const jwt = require('jsonwebtoken');
const AuthError = require('../errors/Auth');
const { unauthorizedMsg } = require('../utils/errorMessages');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(unauthorizedMsg.noToken);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError(unauthorizedMsg.noToken);
  }

  req.user = payload;

  next();
};

module.exports = auth;
