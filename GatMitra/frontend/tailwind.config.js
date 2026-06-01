/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f3ff',
          100: '#e0e4ff',
          200: '#c5cbff',
          300: '#9fa8ff',
          400: '#757eff',
          500: '#1a237e', // Stitch Primary Container Blue
          600: '#000666', // Stitch Main Primary Deep Blue
          700: '#00044d',
          800: '#000333',
          900: '#00011a',
          950: '#00000a',
        },
        success: {
          50: '#edf7ed',
          500: '#1b6d24', // Stitch Secondary/Success Green
          600: '#2e7d32',
        },
        error: {
          500: '#ba1a1a', // Stitch Error Red
        },
        slate: {
          950: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
