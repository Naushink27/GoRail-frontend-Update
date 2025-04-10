import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <- this line is important
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes: ["dim"], // <- this line is important
  } // <- add daisyui here
};
