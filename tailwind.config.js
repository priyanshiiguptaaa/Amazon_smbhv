/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amazon-orange': '#FF9900',
        'amazon-lightOrange': '#FEBD69',
        'amazon-blue': '#232F3E',
        'amazon-lightBlue': '#37475A',
        'amazon-yellow': '#FFD814',
        'amazon-beige': '#F5F5F5',
        800: '#1e2b4a',
        900: '#172136',
      },
    },
  },
  plugins: [],
}