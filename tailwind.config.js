const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./app/**/*', './app/routes/**/*', './app/components/**/*'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': [...defaultTheme.fontFamily.sans, 'Roboto'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
