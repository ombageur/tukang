/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Bisa disesuaikan
          dark: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
} 