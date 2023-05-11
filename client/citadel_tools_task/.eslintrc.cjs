/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
    // "@vue/eslint-config-prettier/skip-formatting"
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    eqeqeq: "error",
    "no-console": "warn",
    "react/display-name": "off",
    "react/no-children-prop": "off",
    indent: ["error", 2],
    "no-multi-spaces": "error",
    "object-curly-spacing": [
      "error",
      "always",
      {
        objectsInObjects: false
      }
    ],
    "space-in-parens": ["error", "never"],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    "no-trailing-spaces": "error",
    "space-before-blocks": "error",
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ],
    "space-infix-ops": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1
      }
    ],
    "computed-property-spacing": ["error", "never"],
    curly: "error",
    "brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: true
      }
    ],
    "block-spacing": "error"
  },
  parserOptions: {
    ecmaVersion: "latest"
  }
};
