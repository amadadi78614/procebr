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
        ink: {
          // Navy-teal base — lighter and warmer than the previous near-black
          950: '#0A2540',
          900: '#11335A',
          850: '#163F6B',
          800: '#1B4B7C',
          700: '#23598F',
          600: '#2D6BA3',
        },
        hud: {
          cyan: '#22E1FF',
          aqua: '#5EEAD4',
          mint: '#10F4A6',
          violet: '#8B6CFF',
          magenta: '#FF4FA3',
          amber: '#FFB547',
          coral: '#FF6B57',
        },
      },
      boxShadow: {
        glow: '0 0 28px -4px rgba(34,225,255,0.35), 0 0 6px rgba(34,225,255,0.2)',
        'glow-violet': '0 0 28px -4px rgba(139,108,255,0.45), 0 0 6px rgba(139,108,255,0.25)',
        'glow-mint': '0 0 28px -4px rgba(16,244,166,0.4), 0 0 6px rgba(16,244,166,0.22)',
        'inner-hud': 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 32px rgba(34,225,255,0.05)',
      },
      backgroundImage: {
        'grid-fine': "linear-gradient(rgba(34,225,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,225,255,0.05) 1px, transparent 1px)",
        'radial-fade': 'radial-gradient(ellipse at center, rgba(34,225,255,0.08), transparent 70%)',
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
