import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '576px', // 가로 px이 각각 576px, 768px, 882px 이상일 때의 스타일을 지정
      md: '768px',
      lg: '882px',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        dark: {
          0: '#2E2E3A',
          1: '#21212A',
          2: '#17171C',
        },
        gray: {
          0: '#D2D2D2',
          1: '#9FA6B2',
          2: '#6E6E82',
        },
        snow: {
          0: '#F1F1F5',
        },
        green: {
          0: '#00D154',
          1: '#00D154',
          2: '#4DFF94',
        },
        yellow: {
          0: '#FFC83C',
        },
      },
    },
  },
  plugins: [],
};
export default config;
