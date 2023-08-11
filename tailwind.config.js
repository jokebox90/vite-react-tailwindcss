/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
import opentype from "tailwindcss-opentype";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: "Ultra",
        ubuntu: "Ubunutu",
        roboto: "Roboto",
        titilium: "Titillium Web",
        source: "Source Sans Pro",
        "source-code": "Source Code Pro",
        bree: "Bree Serif",
        noto: "Noto Sans",
        "noto-serif": "Noto Serif",
      },
      colors: {
        light: "#fafafa",
        "light-100": "#f5f5f4",
        "light-200": "#e5e5e5",
        "light-300": "#d4d4d4",
        dark: "#44403c",
        "dark-100": "#292524",
        "dark-200": "#1c1917",
        "dark-300": "#0c0a09",
        primary: {
          50: "#ECF3F8",
          100: "#D9E6F2",
          200: "#B7D0E6",
          300: "#92B7D9",
          400: "#6C9FCB",
          500: "#4988BF",
          600: "#366C9B",
          700: "#295275",
          800: "#1C374F",
          900: "#0D1A26",
          950: "#070D13",
        },
        secondary: {
          50: "#F7F8E2",
          100: "#EFF1C6",
          200: "#DEE189",
          300: "#CED350",
          400: "#ABAF2C",
          500: "#70731D",
          600: "#5B5E18",
          700: "#444511",
          800: "#2C2D0B",
          900: "#181806",
          950: "#0C0C03",
        },
        accent: {
          50: "#FAF2EA",
          100: "#F5E2D1",
          200: "#EAC5A4",
          300: "#E0AA7A",
          400: "#D68D4D",
          500: "#BF712C",
          600: "#995A23",
          700: "#74441B",
          800: "#4B2C11",
          900: "#251609",
          950: "#150C05",
        },
      },
    },
  },
  plugins: [daisyui, opentype],
  daisyui: {
    themes: [
      {
        owner: {
          primary: "#4988BF",
          secondary: "#70731D",
          accent: "#BF712C",
          neutral: "#78716c",
          "base-100": "#f5f5f4",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
