// tailwind.config.js
const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/components/spinner.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        batak: ['Noto Sans Batak', 'sans-serif'],
        bawor: ['Bawor', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
