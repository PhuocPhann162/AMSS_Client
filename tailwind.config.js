import { colors } from './src/configs/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        ...colors,
      },
      backgroundImage: {
        video: 'url("../images/video/video.png")',
      },
      content: {
        'icon-copy': 'url("../images/icon/icon-copy-alt.svg")',
      },
      backdropSaturate: {
        180: '180%',
      },
      backdropBlur: {
        10: '10px',
        20: '20px',
        60: '60px',
      },
      screens: {
        xs: '30em',
      },
    },
  },
  plugins: [],
};
