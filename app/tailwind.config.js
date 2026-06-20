export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0A0A0A',
        surface2: '#121212',
        'on-surface': '#D4AF37',
        'on-surface-variant': '#C4C7C7',
        secondary: '#D4AF37',
        surfaceVariant: '#333535',
        outline: '#8E9192',
        background: '#121414'
      },
      borderRadius: {
        DEFAULT: '0px',
        full: '9999px'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 20px 80px rgba(212,175,55,0.18)'
      }
    }
  },
  plugins: []
};
