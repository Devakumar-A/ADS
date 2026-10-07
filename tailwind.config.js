/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '414px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        brand: {
          primary: '#0B3B82',       // Sophisticated deep blue - primary brand color
          'primary-hover': '#072A5E',
          deep: '#072A5E',          // High-contrast deep blue for dark sections, strong headings
          'deep-darker': '#041B3D',
          accent: '#1769E0',        // Bright blue for links, active states, micro-accents
          'accent-hover': '#0F56BC',
          'accent-subtle': '#EBF3FC',// Very light blue tint
          tint: '#F0F5FD',
        },
        surface: {
          ground: '#FFFFFF',        // Pure white (70-80% of interface)
          subtle: '#F5F8FC',        // Very subtle cool white for section separation
          card: '#FFFFFF',
          border: '#E4EAF2',        // Very light cool gray architectural border
          'border-subtle': '#EEF2F6',
          dark: '#072A5E',          // Deep blue background for contrast sections
          'dark-surface': '#0B3B82',
          'dark-border': '#133D7C',
        },
        text: {
          primary: '#101828',       // Crisp dark charcoal for primary reading
          secondary: '#475467',     // Balanced slate for subtext and descriptions
          muted: '#667085',         // Subtle gray for metadata and indices
          blue: '#0B3B82',          // Deep brand blue text
          accent: '#1769E0',        // Bright blue interactive text
          white: '#FFFFFF',         // White text on dark blue sections
          'white-muted': '#D0D5DD', // Muted text on dark blue sections
        }
      },
      fontFamily: {
        display: ['Manrope', '-apple-system', 'system-ui', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Disciplined typography scale for corporate + creative balance
        'display-2xl': ['clamp(2.5rem, 6.5vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-xl': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-lg': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-1': ['clamp(1.5rem, 3.2vw, 2.35rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-2': ['clamp(1.25rem, 2.4vw, 1.85rem)', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading-3': ['clamp(1.1rem, 1.8vw, 1.45rem)', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'body-base': ['1rem', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'label-caps': ['0.75rem', { lineHeight: '1', letterSpacing: '0.08em', fontWeight: '600' }],
        'label-xs': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '700' }],
      },
      maxWidth: {
        'content': '1280px',
        'editorial': '1380px',
        'reading': '680px',
      },
      borderRadius: {
        'sm': '3px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
      },
      transitionTimingFunction: {
        'corporate': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(0.5deg)' },
        },
        'float-scroll': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.38', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fade-in-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'float-gentle': 'float-gentle 4.5s ease-in-out infinite',
        'float-scroll': 'float-scroll 2.4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
