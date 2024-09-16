module.exports = {
  // commitlint-plugin-function-rules 플러그인을 사용
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    // 커밋 타입 제한(오류 레벨: 2는 오류를 의미), 타입은 아래 배열 요소 중 하나로 해야 함
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'design', 'comment', 'style', 'test', 'chore', 'init', 'rename', 'remove'],
    ],
    'type-case': [2, 'always', 'lower-case'], // 커밋 타입은 항상 소문자
    'subject-empty': [2, 'never'], // 커밋 제목은 비어있으면 안됨
    'subject-full-stop': [2, 'never', '.'], // 커밋 제목은 마침표로 끝나면 안됨
    'body-leading-blank': [2, 'always'], // 커밋 본문 앞에는 빈 줄이 있어야 함
    'body-max-line-length': [2, 'always', 100], // 커밋 본문의 각 줄은 최대 100자
    'header-max-length': [2, 'always', 100], // 커밋 헤더(타입 + 제목)는 최대 100자
  },
};
