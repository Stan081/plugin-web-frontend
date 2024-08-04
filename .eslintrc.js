module.exports = {
  extends: [
    'next',
    'prettier',
    'eslint:recommended',
  ],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
  },
};