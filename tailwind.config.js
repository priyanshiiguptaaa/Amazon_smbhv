/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amazon-blue': '#232F3E',
        'amazon-lightBlue': '#37475A',
        'amazon-orange': '#FF9900',
        'amazon-yellow': '#FEBD69',
      }
    },
  },
  plugins: [],
}