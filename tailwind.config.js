/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a9dbf9",
          secondary: "#26f252",
          accent: "#f4b39f",
          neutral: "#171a21",
          "base-100": "#e7e7e9",
          info: "#a8c7eb",
          success: "#18b973",
          warning: "#b89b0a",
          error: "#f90b1f",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

