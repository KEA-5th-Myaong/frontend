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
        gray: {
          0: '#F4F4F4',
          1: '#E0E0E0',
          2: '#B8B8B8',
          3: '#929292',
          4: '#6E6E6E',
          5: '#4B4B4B',
          6: '#2B2B2B',
          7: '#111111',
        },
        green: {
          0: '#00D154',
        },
      },
    },
  },
  plugins: [],
};
export default config;
