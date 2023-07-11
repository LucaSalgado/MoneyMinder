/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'], // Regular 400, Medium 500, Medium 500 Italic e Bold 700
      sans: ['ui-sans-serif', 'system-ui'],
      money: ['Pacifico', 'cursive'],
      minder: ['Share Tech Mono', 'monospace']
    },
    extend: {
      colors: {
        // Cores retiradas de um gerador online
        // https://mycolor.space/?hex=%23DC1224&sub=1
        // Favor usar a regra: 60/30/10
        'Vermelho':   "#DC1224", // Cor principal, escolhida como identidade da marca
        'Marrom':     '#57423E', // Cor auxiliar
        'Bege':       '#BEA6A1', // Cor base para o modo escuro "dark"
        'Azul':       '#0066F6', // Cor secundária escolhida para ser o contraste
        'Azul-claro': '#6698FF'  // Cor base para o modo claro "light"
      }
    },
  },
  plugins: [],
}

