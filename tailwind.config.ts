import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './icons/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xs: '400px',
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Comfortaa Variable', 'sans-serif'],
        'lilita-one': ['Lilita One', 'sans-serif'],
      },
      colors: {
        primary: '#124E78',
        secondary: '#F5F5F7',
        tertiary: '#1C1C1C',
        'deep-gray': '#1C1C1C',
        quaternary: '#F8F7FF',
        persianBlue: '#1E40AF',
        jewel: '#166534',
        oldBrick: '#991B1B',
        verified: '#0284c7',
        error: 'rgb(211, 47, 47)',
        warning: 'rgb(245, 124, 0)',
        info: 'rgb(2, 136, 209)',
        success: 'rgb(56, 142, 60)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-animated')],
} satisfies Config;

export default config;
