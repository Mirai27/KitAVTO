/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    // Добавьте другие пути к вашим файлам, если необходимо
  ],
  theme: {
    extend: {
      colors: {
        accent: "#64187f", // ваш акцентный цвет
      },
    },
  },
  plugins: [],
};