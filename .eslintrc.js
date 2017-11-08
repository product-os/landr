module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: [ 'eslint:recommended', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      classes: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: [2, 2, { 'SwitchCase': 1 }],
    'no-console': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
};
