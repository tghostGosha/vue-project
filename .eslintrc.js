/* eslint-disable */
// eslint-disable-next-line
module.exports = {
  root: true,
  env: {
    node: true,
    // 'browser': true,
    // 'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',

  ],
  parserOptions: {
    parser: 'babel-eslint',
    'ecmaVersion': 12,
    'sourceType': 'module'
  },

  rules: {

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //   "jsx-a11y/label-has-associated-control": "off",
    //   "jsx-a11y/label-has-for": "off",
    'no-var': 'error',
    'max-len': ["error", {
      "code": 130
    }],
    "vue/no-multiple-template-root": 0,
    "vue/no-parsing-error": [
      "error",
      {
        "unexpected-solidus-in-tag": false,
        "end-tag-with-attributes": false,
      }
    ],

    "prefer-const": ["error", {
      "destructuring": "all",
      "ignoreReadBeforeAssign": true
    }],

    //   "vuejs-accessibility/label-has-for": "off",
    //   "vuejs-accessibility/form-has-label": "off",
    //   "vuejs-accessibility/form-control-has-label": "off",

  },
};
