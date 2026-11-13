import type { Config } from 'tailwindcss';

// Colors read CSS variables so the light/dark toggle only swaps variables.
const themed = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: themed('--c-bg'),
        surface: themed('--c-surface'),
        fg: themed('--c-fg'),
        muted: themed('--c-muted'),
        primary: '#7C5CFF',
        secondary: '#00D1B2',
        accent: '#FF6B35',
        success: '#2ECC71',
        error: '#FF4D4F',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};

export default config;
