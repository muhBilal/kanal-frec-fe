/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  darkMode: ['class', '[data-mode="light"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#2563eb',
      dark : '#010019',
    },
    fontFamily: {
      poppins: ['Poppins'],
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
  plugins: [require('flowbite/plugin')],
};
