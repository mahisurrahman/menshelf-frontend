/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: '#0C0C0C',
        secondary: '#481E14',
        third: '#9B3922',
        fourth: '#99bc84',
        fifth: '#F8F4E1',
        white: '#fff',
        sixth: '#eae5e5',
        seventh: '#019332',
        eight: '#f7f7f7',
        ninth: '#b7b7b7',
        tenth: '#ff0000',
        eleventh: '#c1bdbd',
        twelth: '#c6d3be',
        'scrollbar-thumb': '#99bc84',
      },
      fontFamily: {
        'lato': "'Lato', sans-serif",
        'grand-stander': "'Grandstander', display",
        'poppins': "'Poppins', sans-serif",
        'arb': "'Arbutus', display",
        'archro': "'Aclonica', sans-serif",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
