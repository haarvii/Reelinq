const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode via `class`
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
      colors: {
        primary: '#1B3B6F',
        secondary: '#3EC1D3',
        background: '#F9FAFC',
        accent: '#FF6B4A',
        dark: {
          bg: '#0F172A',
          text: '#E2E8F0',
        },
        light: {
          bg: '#FFFFFF',
          text: '#1E1E1E',
        }
      }
    },
  },
  plugins: [],
}