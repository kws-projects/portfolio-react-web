/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      colors: {
        'surface-code': 'rgb(var(--color-surface-code) / <alpha-value>)',
      },
      boxShadow: {
        custom: '0 0 25px rgba(var(--color-shadow-blue), 0.16)',
        'custom-sm': '0 0 6px rgba(var(--color-shadow-blue), 0.16)',
        'custom-neu':
          '10px 10px 10px -1px rgba(var(--color-shadow-blue), 0.16), -10px -10px 10px -1px rgba(255, 255, 255, 0.70)',
        'custom-neu-hover':
          '20px 20px 20px -1px rgba(var(--color-shadow-blue), 0.16), -20px -20px 20px -1px rgba(255, 255, 255, 0.70)',
        'custom-neu-sm':
          '6px 6px 6px -1px rgba(var(--color-shadow-blue), 0.16), -6px -6px 6px -1px rgba(255, 255, 255, 0.70)',
        'custom-neu-sm-hover':
          '10px 10px 10px -1px rgba(var(--color-shadow-blue), 0.16), -10px -10px 10px -1px rgba(255, 255, 255, 0.70)',
      },
    },
  },
  plugins: [],
}
