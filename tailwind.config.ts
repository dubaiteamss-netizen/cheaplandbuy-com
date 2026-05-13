import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EDF4FF',
          100: '#DAEAF8',
          200: '#B5D4F2',
          300: '#7BAEDE',
          400: '#3D85C8',
          500: '#1976D2',
          600: '#1565C0',
          700: '#0C4A8F',
          800: '#083670',
          900: '#052654',
        },
        gold: {
          DEFAULT: '#FFD166',
          dark:    '#F5B800',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
