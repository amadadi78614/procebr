/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        navy:   '#0B2545',
        sky:    '#0EA5E9',
        teal:   '#0D9488',
        brand:  '#1670C0',
      },
    },
  },
  plugins: [],
}
