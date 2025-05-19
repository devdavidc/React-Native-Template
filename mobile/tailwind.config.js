/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  // NOTE: You can modify and add all variables you want
  theme: {
    extend: {
      colors:{
        primary: '<your_primary_color>',
        secondary: '<your_secondary_color>',
        light: {
          100: '<your_color>',
          200: '<your_color>',
          300: '<your_color>',
          // ...
        },
        dark: {
          100: '<your_color>',
          200: '<your_color>',
          300: '<your_color>',
          // ...
        },
        accent: '<your_accent_color>',

      }
    },
  },
  plugins: [],
}