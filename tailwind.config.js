/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f2ecff',
          DEFAULT: '#7fd1ae',
          dark: '#009063',
        },
        secondary: {
          light: '#E9EDC9',
          DEFAULT: '#435B66',
          dark: '#324b4c',
        },
        accent: '#652662',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};
