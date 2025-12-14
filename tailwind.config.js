/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🌙 поддержка светлой / тёмной темы
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // основной текст приложения
        sans: ["Inter", "system-ui", "sans-serif"],

        // заголовки (по желанию можно использовать другой)
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
