/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#160e26',
        secondary: '#bdf288',
        accent: '#8c2f0d',
        lightSecondary: '#cbf291',
        lightAccent: '#d98982',
        purple: '#937Bd1',
        blue: '#5cc1d8',
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
