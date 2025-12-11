/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFF',
        secondary: '#2A2E37',
        accent: '#28D7FF',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}

