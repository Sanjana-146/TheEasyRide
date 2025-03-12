/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      zIndex: {
        '9999': '9999',
      }
    },
  },
  plugins: [],
}

