/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'], // Regular 400, Medium 500, Medium 500 Italic e Bold 700
      sans: ['ui-sans-serif', 'system-ui'],
    },
    extend: {},
  },
  plugins: [],
}

