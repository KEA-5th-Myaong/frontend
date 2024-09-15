module.exports = {
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'design', 'comment', 'style', 'test', 'chore', 'init', 'rename', 'remove'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
  },
};
