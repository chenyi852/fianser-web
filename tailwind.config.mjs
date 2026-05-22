/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          bg: '#FAFAF8',
          card: '#FFFFFF',
          text: '#1A1A1A',
          'text-secondary': '#6B6B6B',
          'text-weak': '#A3A3A3',
          accent: '#C4956A',
          'accent-hover': '#B08555',
          border: '#E5E5E5',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        'serif-cn': ['"Noto Serif SC"', '"Source Han Serif CN"', 'serif'],
        'sans-cn': ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        'en': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
