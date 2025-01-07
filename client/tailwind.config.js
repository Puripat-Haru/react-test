/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {'pearl-bush': {
        '50': '#f9f7f3',
        '100': '#f0ece4',
        '200': '#e4dccf',
        '300': '#ccbca5',
        '400': '#b79e80',
        '500': '#a88767',
        '600': '#9b765b',
        '700': '#81604d',
        '800': '#694f43',
        '900': '#564338',
        '950': '#2e221c',
    },
    },
  },
  plugins: [],
}

