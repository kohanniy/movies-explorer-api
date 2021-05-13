module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    // 'object-curly-newline': 'off',
    // 'func-names': 'off',
    // 'no-unused-vars': ['error', { args: 'none' }],
    // 'consistent-return': 'off',
    // 'eslint-disable': 'off',
    // 'eslint-disable-line': 'off',
    // 'eslint-disable-next-line': 'off',
  },
};
