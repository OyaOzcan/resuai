/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4fd',
          100: '#fae4fa',
          200: '#f5cbf5',
          300: '#eda9ed',
          400: '#d48fd4',
          500: '#b76fb7',
          600: '#9d539d',
          700: '#813c81',
          800: '#692b69',
          900: '#4d1a4d',
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#ffffff',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
};
