/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wonder: {
          orange: '#F45124',
          'orange-hover': '#e04216',
          sky: '#65BDEB',
          bg: '#EAF6FF',
          purple: '#9375E8',
          yellow: '#FFD66B',
          navy: '#19324D',
          dark: '#0c1b2a',
        }
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-orange': '0 0 25px -3px rgba(244, 81, 36, 0.45)',
        'glow-sky': '0 0 25px -3px rgba(101, 189, 235, 0.45)',
        'glow-purple': '0 0 25px -3px rgba(147, 117, 232, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}

