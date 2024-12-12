import type { Config } from 'tailwindcss';
// eslint-disable-next-line import/no-extraneous-dependencies
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
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
        blue: {
          0: '#4992FF',
          1: '#007FFF',
          2: '#F2F2F7',
        },
        white: {
          0: '#FFFFFF',
          1: '#F1F1F5',
          2: '#F5FFF9',
        },
        primary: {
          0: '#D8E6F2',
          1: '#41AED9',
          2: '#3BBCD9',
          3: '#52E2F2',
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
        green: {
          0: '#00D154',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.pre-3xl-semibold': {
          fontSize: '32px',
          fontWeight: theme('fontWeight.semibold'),
        },
        '.pre-2xl-medium': {
          fontSize: '20px',
          fontWeight: theme('fontWeight.medium'),
        },
        '.pre-2xl-semibold': {
          fontSize: '20px',
          fontWeight: theme('fontWeight.semibold'),
        },
        '.pre-2xl-bold': {
          fontSize: '20px',
          fontWeight: theme('fontWeight.bold'),
        },
        '.pre-xl-medium': {
          fontSize: '15px',
          fontWeight: theme('fontWeight.medium'),
        },
        '.pre-xl-semibold': {
          fontSize: '15px',
          fontWeight: theme('fontWeight.semibold'),
        },
        '.pre-xl-bold': {
          fontSize: '15px',
          fontWeight: theme('fontWeight.bold'),
        },
      });
    }),
  ],
};
export default config;
