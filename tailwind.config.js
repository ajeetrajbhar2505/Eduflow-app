/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#4C7DF2',
        accent: '#A855F7',
        ink: '#0B1021',
        'ink-muted': '#111827',
        glass: 'rgba(255,255,255,0.08)',
        navy: '#0A192F',
        'navy-light': '#172A45',
        'background-light': '#f8fafc',
        'background-dark': '#0f1923',
        'border-gray': '#E2E8F0',
        'accent-blue': '#359EFF',
        "danger": "#ef4444",
        "accent": "#81ecff",
        "charcoal": "#0a0a0a",
        "charcoal-light": "#141414",
        "charcoal-border": "#222222",
        "surface": "#0a0a0a",
        "on-surface": "#ffffff",
        "on-surface-variant": "#a0a0a0"
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        montserrat: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 32px rgba(76, 125, 242, 0.4)',
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
