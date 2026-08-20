/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7b002c',
          dark: '#570000',
          black: '#0a0a0a',
          light: '#9e1245',
        },
        maroon: {
          DEFAULT: '#7b002c',
          50: '#ffffff',
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#7b002c',
          600: '#9e1245',
          700: '#570000',
          800: '#4c050d',
          900: '#3b0015',
          950: '#0a0a0a',
          light: '#ffffff',
        },
        rose: {
          DEFAULT: '#7b002c',
          50: '#ffffff',
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#7b002c',
          600: '#9e1245',
          700: '#570000',
          800: '#4c050d',
          900: '#3b0015',
          950: '#0a0a0a',
        },
        gold: {
          DEFAULT: '#7b002c',
          light: '#ffffff',
          container: '#f8fafc',
          dark: '#570000',
          accent: '#7b002c'
        },
        emerald: {
          DEFAULT: '#7b002c',
          light: '#ffffff',
          dark: '#570000',
          50: '#ffffff',
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#7b002c',
          600: '#9e1245',
          700: '#570000',
          800: '#4c050d',
          900: '#3b0015',
        },
        surface: {
          DEFAULT: '#ffffff',
          slate: '#f8fafc',
          card: '#ffffff',
          muted: '#f1f5f9',
        },
        onSurface: {
          DEFAULT: '#0f172a',
          muted: '#64748b',
          subtle: '#94a3b8',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
        'luxury': '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
        'maroon-glow': '0 0 20px rgba(123, 0, 44, 0.3)',
      },
      borderRadius: {
        'sharp': '0px',
        'soft': '0.375rem',
        'xl': '0.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(123, 0, 44, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 20px rgba(123, 0, 44, 0.8))' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
