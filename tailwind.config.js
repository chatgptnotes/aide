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
          50: '#f0f9ff',
          500: '#0F4C75',
          600: '#0c3d5f',
          700: '#093049',
        },
        secondary: {
          500: '#3282B8',
          600: '#2a6b99',
          700: '#22547a',
        },
        accent: {
          500: '#00B4D8',
          600: '#0097b3',
          700: '#007a8e',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
      },
    },
  },
  plugins: [],
}