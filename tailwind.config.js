const tailwindcss = require("tailwindcss");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display':'Segoe UI',
    },
    extend: {
      fontSize: {
        'xxs': ['0.625rem', '0.75rem'],
      },
      colors: {
        gray: {
          '750': '#171F30',
        }
      },
      inset: {
        '1/8':'12.5%',
        '1/6':'16.67%',
        '1/10':'10%',
        '1/16':'6.25%',
      },
      width: {
        '9-1':'9.1rem',
        '1/9':'11.11%',
        '2/9':'22.22%',
      },
      spacing: {
        '18':'4.5rem',
      },
    },
  },
  variants: {
    extend: {
      fill: ['hover'],
      height: ['hover', 'focus'],
    },
  },
  plugins: [],
}
