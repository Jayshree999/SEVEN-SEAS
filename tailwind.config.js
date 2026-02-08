/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C1C1C', // Soft charcoal/black
        secondary: '#FAFAF5', // Cream/Off-white
        accent: '#A38047', // Classic Gold
        'light-gray': '#F2F2F2',
        'dark-gray': '#4A4A4A',
        // Metallic Gold System
        gold: '#A38047', // Classic Gold (Desaturated)
        'gold-light': '#D4AF37', // Metallic sheen
        'gold-dark': '#8B6914', // Deep bronze
        // Deep Contrast System
        'royal-blue': '#0f172a', // Deep slate blue (modern luxury)
        'charcoal': '#1C1C1C', // Rich black
        luxury: '#1C1C1C', // Primary luxury text color
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

