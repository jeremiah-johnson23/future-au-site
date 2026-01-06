/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#0a3a3a',
          900: '#0d4a4a',
          800: '#105a5a',
          700: '#156b6b',
          600: '#1a7c7c',
        },
        gold: {
          500: '#f5c518',
          400: '#f7d04c',
          300: '#f9db80',
        },
        cream: {
          50: '#f5f3e8',
          100: '#edecd7',
          200: '#e8e0c8',
          300: '#d9d0b5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
