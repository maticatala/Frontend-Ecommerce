/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      'phone': '100px',
      // => @media (min-width: x px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    sm: '576px',
    md:'768px',
    lg:'992px',
    xl:'1200px',
  },
  container: {
    center:true,
    padding: '1rem'
  },

  plugins: [],
}

