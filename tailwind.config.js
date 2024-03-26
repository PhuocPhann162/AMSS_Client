/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nav: '#242a2e',
        primary: '#00c46a'
      }
    }
  },
  plugins: []
};
