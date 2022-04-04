// bonus colors
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4831D4',
        secondary: '#CCF381',
        gray: colors.gray,
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        }
      },
      flex: {
        '1/3': '1 1 33%',
        '1/4': '1 1 25%',
        '1/2': '1 1 50%',
      }
    },
  },
  plugins: [],
}
