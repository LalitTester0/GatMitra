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
        slate: {
          950: '#0f172a',
        },
        // Stitch native theme colors
        error: "#ba1a1a",
        background: "#fbf8ff",
        "surface-container-lowest": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e4e1ea",
        "inverse-primary": "#bdc2ff",
        "surface-container-high": "#eae7ef",
        "on-surface-variant": "#454652",
        "on-secondary-container": "#217128",
        "on-secondary-fixed": "#002204",
        "on-primary": "#ffffff",
        "on-primary-fixed-variant": "#343d96",
        "surface-dim": "#dbd9e1",
        "primary-fixed-dim": "#bdc2ff",
        "on-primary-container": "#8690ee",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "surface-tint": "#4c56af",
        "surface-container-low": "#f5f2fb",
        "on-tertiary-fixed": "#390c00",
        "inverse-surface": "#303036",
        "primary-fixed": "#e0e0ff",
        "inverse-on-surface": "#f2eff8",
        "on-tertiary-fixed-variant": "#7b2e12",
        "on-primary-fixed": "#000767",
        "on-background": "#1b1b21",
        "secondary-fixed-dim": "#88d982",
        "on-secondary-fixed-variant": "#005312",
        "outline-variant": "#c6c5d4",
        primary: "#000666",
        "tertiary-container": "#5c1800",
        tertiary: "#380b00",
        "surface-variant": "#e4e1ea",
        "surface-container": "#efecf5",
        "tertiary-fixed-dim": "#ffb59d",
        "on-surface": "#1b1b21",
        "tertiary-fixed": "#ffdbd0",
        surface: "#fbf8ff",
        secondary: "#1b6d24",
        "on-error": "#ffffff",
        "secondary-fixed": "#a3f69c",
        "secondary-container": "#a0f399",
        "on-error-container": "#93000a",
        "primary-container": "#1a237e",
        outline: "#767683",
        "surface-bright": "#fbf8ff",
        "on-tertiary-container": "#e17c5a"
      },
      spacing: {
        base: "8px",
        xl: "64px",
        gutter: "24px",
        md: "24px",
        "margin-desktop": "48px",
        lg: "40px",
        xs: "4px",
        sm: "12px",
        "margin-mobile": "16px"
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        "title-md": ["Inter"],
        "body-lg": ["Inter"],
        "headline-lg-mobile": ["Inter"],
        "label-lg": ["Inter"],
        "body-md": ["Inter"],
        "headline-lg": ["Inter"],
        "label-sm": ["Inter"],
        "display-lg": ["Inter"]
      },
      fontSize: {
        "title-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.1px", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }]
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
