/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#ed2e24',
        primary: '#00293c',
        'primary-dark': '#001c29',
        'primary-light': '#345463',
        white: '#ffffff',
      },
      opacity: {
        30: '0.3',
        70: '0.7',
      },
    },
  },
};
