module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: 0,
    quotes: 0,
    camelcase: 0,
    curly: 0,
    'react/prop-types': 0,
    'spaced-comment': 0,
    'comma-dangle': 0,
    'no-undef': 0,
    'no-unused-vars': 1,
    'multiline-ternary': 0,
  },
};
