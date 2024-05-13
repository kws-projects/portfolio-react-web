/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 25px rgba(10, 99, 169, 0.16)',
        'custom-sm': '0 0 6px rgba(10, 99, 169, 0.16)',
        'custom-neu': '10px 10px 10px -1px rgba(10, 99, 169, 0.16), -10px -10px 10px -1px rgba(255, 255, 255, 0.70)'
      }
    },
  },
  plugins: [],
}

