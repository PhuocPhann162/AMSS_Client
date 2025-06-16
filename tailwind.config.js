import { colors } from './src/configs/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
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
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'type-1': '#e7efef',
        'type-2': '#5e6b70',
        be: '#f3f4f6',
        brown: '#5D3D2E',
        file: '#24A9E1',
        current: 'currentColor',
        transparent: 'transparent',
        body: '#64748B',
        bodydark: '#AEB7C0',
        bodydark1: '#DEE4EE',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        stroke: '#E2E8F0',
        // gray: '#EFF4FB',
        // graydark: '#333A48',
        // 'gray-2': '#F7F9FC',
        // 'gray-3': '#FAFAFA',
        whiten: '#F1F5F9',
        boxdark: '#24303F',
        strokedark: '#2E3A47',
        'form-strokedark': '#3d4d60',
        'form-input': '#1d2a39',
        'meta-2': '#EFF2F7',
        'meta-3': '#10B981',
        'meta-4': '#313D4A',
        'meta-5': '#259AE6',
        success: '#219653',
        danger: '#D34053',
        warning: '#FFA70B',
        status: {
          success: {
            dark: '#86c988',
            light: '#edf7ed',
          },
          white: {
            dark: '#979dac',
            light: '#f9fafc',
          },
          warning: {
            dark: '#f9b567',
            light: '#fef6ec',
          },
          info: {
            dark: '#75a5ff',
            light: '#ebf2ff',
          },
          accent: {
            dark: '#5D3D2E',
            light: '#FDF9F7',
          },
          danger: {
            dark: '#f18b9d',
            light: '#fef6f6',
          },
        },
        res: {
          draft: '#D9D9D9',
          inprogress: '#BFDFED',
          pending: '#F7F8C5',
          approved: '#D2EBE2',
          rejected: '#F2CDCD',
          refunded: '#F7DFA4',
        },
        clr: {
          1: '#2E291D',
          2: '#795E28',
          3: '#B68931',
          4: '#FFB859',
          5: '#F7C35F',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontSize: {
        'title-md': ['24px', '30px'],
        'title-md2': ['26px', '30px'],
      },
      backgroundImage: {
        video: 'url("../images/video/video.png")',
      },
      content: {
        'icon-copy': 'url("../images/icon/icon-copy-alt.svg")',
      },
      transitionProperty: {
        width: 'width',
        stroke: 'stroke',
      },
      boxShadow: {
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        switcher:
          '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        rotating: {
          '0%, 100%': {
            transform: 'rotate(360deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: '#00c46a',

  //         secondary: '#009e35',

  //         accent: '#5D3D2E',

  //         neutral: '#292221',

  //         'base-100': '#232217',

  //         info: '#00aeff',

  //         success: '#4bc552',

  //         warning: '#ffb100',

  //         error: '#dc2626',

  //         active: '#ffffff',
  //       },
  //     },
  //   ],
  // },
  plugins: [require('tailwindcss-animate')],
};
