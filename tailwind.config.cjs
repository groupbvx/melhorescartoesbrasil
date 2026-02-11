/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'visa': '#1A1F71',
        'mastercard': '#EB001B',
        'amex': '#006FCF',
        'elo': '#2C3E50',
        'hipercard': '#8B1538',
        'brasil': '#009C3B',
        'santander': '#EC0000',
        'itau': '#FD6D00',
        'bradesco': '#CC092F',
        'caixa': '#0058A6',
        'nu': '#8A05BE',
        'inter': '#FF7900',
        'original': '#F79E1B',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
