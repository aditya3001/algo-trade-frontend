module.exports = {
  plugins: [
      require('tailwindcss')('./tailwind.config.js'), // Path to your Tailwind config file
      require('autoprefixer')
      // You can add more plugins here
  ]
};