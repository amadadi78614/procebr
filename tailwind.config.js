/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Powder-blue / turquoise light theme
        powder: {
          50:  '#FAFDFE', // near-white surface
          100: '#F1F8FB', // light surface
          200: '#E2F0F5', // page base
          300: '#CFE3EC', // subtle mid
          400: '#B4D0DC', // visible mid
          500: '#8FB2C2', // border/divider
          600: '#5A8194',
          700: '#3A6175',
          800: '#1F4A5F',
          900: '#0D344A',
          950: '#062436', // primary text
        },
        // HUD accents — more saturated to read on light backgrounds
        hud: {
          cyan: '#0891B2',     // deep cyan
          'cyan-bright': '#06B6D4', // bright cyan
          aqua: '#14B8A6',     // turquoise
          mint: '#10B981',     // emerald
          teal: '#0D9488',     // teal
          violet: '#7C3AED',
          magenta: '#DB2777',
          amber: '#D97706',
          coral: '#E11D48',
        },
      },
      boxShadow: {
        // Real shadows now matter — dark on light
        glow: '0 0 28px -4px rgba(8,145,178,0.30), 0 1px 0 rgba(255,255,255,0.6)',
        'glow-violet': '0 0 28px -4px rgba(124,58,237,0.32), 0 1px 0 rgba(255,255,255,0.6)',
        'glow-mint': '0 0 28px -4px rgba(16,185,129,0.32), 0 1px 0 rgba(255,255,255,0.6)',
        card: '0 4px 12px -2px rgba(15,60,80,0.08), 0 2px 4px -1px rgba(15,60,80,0.06)',
        'card-lg': '0 24px 48px -12px rgba(15,60,80,0.18), 0 8px 16px -6px rgba(15,60,80,0.10)',
        'inner-hud': 'inset 0 1px 0 rgba(255,255,255,0.65), 0 1px 2px rgba(15,60,80,0.06)',
      },
      backgroundImage: {
        'grid-fine': "linear-gradient(rgba(58,97,117,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(58,97,117,0.07) 1px, transparent 1px)",
        'radial-fade': 'radial-gradient(ellipse at center, rgba(8,145,178,0.08), transparent 70%)',
      },
      backgroundSize: {
        'grid-fine': '48px 48px',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        dash: {
          to: { strokeDashoffset: '-200' },
        },
      },
      animation: {
        sweep: 'sweep 6s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        dash: 'dash 4s linear infinite',
      },
    },
  },
  plugins: [],
}
