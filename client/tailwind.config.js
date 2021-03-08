const defaults = require('windicss/defaultTheme')

/**
 * @type {import('windicss/types/interfaces').Config}
 */
const config = {
  theme: {
    colors: {
      orange: '#FF7F11',
      red: '#FF3F00',
      blue: '#485696',
      green: '#008148',
      current: 'currentColor',
      transparent: 'transparent',
      white: '#FCFAF9',
      black: '#000000',
      gray: {
        light: '#DADADA',
        DEFAULT: '#939393',
        dark: '#4F4F4F',
      },
      facebook: '#3B5998',
      google: {
        DEFAULT: '#DE5246',
        docs: '#337DFA',
      },
    },
    fontFamily: {
      sans: ['Carme', ...defaults.fontFamily.sans],
      serif: ['Cardo', ...defaults.fontFamily.serif],
    },
    fontSize: {
      base: ['1rem', '-0.055rem'],
      md: ['1.75rem', '-0.125rem'],
      lg: ['2.5rem', '-0.1rem'],
      xl: ['6rem', '-0.2rem'],
    },
    spacing: {
      sm: '0.625rem',
      md: '1.25rem',
      lg: '1.875rem',
    },
  },
  darkMode: false,
}

module.exports = config
