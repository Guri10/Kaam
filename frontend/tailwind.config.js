/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      // you can add custom colors, fonts, etc. here
      colors: {
        primary: '#8B5CF6',
        background: '#1E293B',
      },
    },
  },
  plugins: [],
}
