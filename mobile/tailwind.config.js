/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  // NOTE: You can modify and add all variables you want
  theme: {
    extend: {
  colors: {
    primary: '#6B5B4B',        // Marrón suave (color principal)
    secondary: '#A39887',      // Beige grisáceo para elementos secundarios
    light: {
      100: '#F7F5F2',          // Blanco hueso para fondos claros
      200: '#E3DED7',          // Gris muy claro con tono cálido
      300: '#C9C3B6',          // Gris cálido claro para bordes o fondos secundarios
      400: '#B0A899',          // Gris topo suave
    },
    dark: {
      100: '#4A4237',          // Marrón oscuro para textos y elementos destacados
      200: '#3B352C',          // Marrón muy oscuro para textos principales
      300: '#2E2A23',          // Casi negro con matiz marrón
      400: '#1F1B17',          // Negro suave, para máximo contraste
    },
    accent: '#D9822B',          // Mostaza quemado para llamar la atención, botones, iconos
    neutral: {
      100: '#F0EFED',          // Gris muy claro para fondos neutrales
      200: '#C4C1BD',          // Gris medio neutro para bordes o textos secundarios
      300: '#8E8A85',          // Gris oscuro para textos menos destacados
    }
  }
    },
  },
  plugins: [],
}