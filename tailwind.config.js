/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C5DFA",
        danger: "#EC5757",
        lightDanger: "#FF9797",
        black: "#0C0E16",
        lightBlack: "#141625",
        extraLightBlack: "#1E2139",
        lightBlue: "#9277FF",
        extraLightBlue: "#DFE3FA",
        almostWhite: "#F8F8FB",
        semiDarkBlue: "#373B53",
        darkCyan: "#888EB0",
        lightCyan: "#7E88C3",
        greenLight: "#33D69F",
        orangeLight: "#FF8F00",
      },
    },
  },
  plugins: [],
};
