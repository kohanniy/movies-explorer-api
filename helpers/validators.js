const isEmail = require('validator/lib/isEmail');
const { regexToCheckURL } = require('../utils/constants');

const emailValidator = (email) => isEmail(email);

const urlValidator = (url) => regexToCheckURL.test(url);

module.exports = {
  emailValidator,
  urlValidator,
};
