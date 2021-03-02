const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: false,
  theme: {
    colors: {
      white: '#FCFAF9',
      orange: '#FF7F11',
      red: '#FF3F00',
      blue: '#485696',
      'light-gray': '#DADADA',
      gray: '#939393',
      'dark-Gray': '#4F4F4F',
      green: '#008148',
      facebook: '#3B5998',
      google: '#DE5246',
      'google-docs': '#337DFA',
    },
    fontFamily: {
      sans: ['Carme', ...defaultTheme.fontFamily.sans],
      serif: ['Cardo', ...defaultTheme.fontFamily.serif],
    },
    maxWidth: (theme, { breakpoints }) => ({
      ...defaultTheme.maxWidth(theme, { breakpoints }),
      prose: '50ch',
    }),
  },
  variants: {
    extend: {
      textDecoration: ['focus-visible'],
    },
  },
  plugins: [],
}
