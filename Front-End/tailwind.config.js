/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'stream': {
          'black': '#0a0a0a',
          'dark': '#141414',
          'card': '#1a1a1a',
          'hover': '#2a2a2a',
          'red': '#e50914',
          'red-hover': '#f40612',
        },
      },
      fontFamily: {
        sans: ['Netflix Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
