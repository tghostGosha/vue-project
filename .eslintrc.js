/* eslint-disable */
module.exports = {
  root: true,
  env: {
    node: true,
    'browser': true,
    'es2021': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    'ecmaVersion': 12,
    'sourseType': 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    'max-len': ["error", { "code": 130 }],
    "vue/no-multiple-template-root": 0,
    "vue/no-parsing-error": [
      "error",
      {
        "unexpected-solidus-in-tag": false,
        "end-tag-with-attributes": false,

      }
    ],

  },
};
