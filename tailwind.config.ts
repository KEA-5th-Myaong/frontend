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
      xl: '1088px',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        black: {
          0: '#000000',
          1: '#17171C',
          2: '#21212A',
          3: '#2E2E3A',
        },
        gray: {
          0: '#6E6E82',
          1: '#9FA6B2',
          2: '#D2D2D2',
          3: '#A6A6A6',
          4: '#F3F3F3',
          5: '#D9D9D9',
        },
        white: {
          0: '#FFFFFF',
          1: '#F1F1F5',
          2: '#F5FFF9',
        },
        primary: {
          0: '#4DFF94',
          1: '#00D154',
          2: '#23B581',
          4: '#41AED9',
        },
        yellow: {
          0: '#FFC83C',
        },
        pink: {
          0: '#FF2F9F',
        },
        red: {
          0: '#FF0000',
        },
      },
    },
  },
  plugins: [],
};
export default config;
