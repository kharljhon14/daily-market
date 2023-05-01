/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark_blue: '#02385E',
        light_blue: '#4AABCB',
        light_grey: '#CFD8DC',
        dark_grey: '#9FA7AD',
        light_accent: '#4CC3DB',
        dark_accent: '#A9C7DC',
      },
    },
  },
  plugins: [],
};
