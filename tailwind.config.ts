import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-delay': 'fade-in 0.6s ease-out 0.2s both',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(40px) scale(0.95)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        'heart-beat': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '25%': {
            transform: 'scale(1.1) rotate(-5deg)',
          },
          '50%': {
            transform: 'scale(1.15) rotate(5deg)',
          },
          '75%': {
            transform: 'scale(1.1) rotate(-3deg)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0) rotate(0deg)',
          },
          '33%': {
            transform: 'translateY(-30px) translateX(10px) rotate(5deg)',
          },
          '66%': {
            transform: 'translateY(-15px) translateX(-10px) rotate(-5deg)',
          },
        },
        'shimmer': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
