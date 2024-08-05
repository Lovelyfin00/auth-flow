/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-blue-100': '#2B86C7',
        'primary-blue-80': '#00A6D6',
        'primary-blue-60': '#00C4CB',
        'primary-blue-40': '#19DCAD',
        'primary-blue-20': '#9BEE88',
        'primary-blue-10': '#F9F871',

        'secondary-brown': '#444444',

        'primary-black-100': '#333333'
      },
      fontFamily: {
        'lato': ["Lato", 'sans-serif']
      }
    },
  },
  plugins: [],
}

