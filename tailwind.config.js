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
          primary: "#14aa5f",       
          secondary: "#b02bd8",        
          accent: "#e0d83a",      
          neutral: "#1c232c",       
          "base-100": "#474a4d",       
          info: "#589cdf",        
          success: "#6de8c1",      
          warning: "#f59a24",
          error: "#e73f3c",
          body: {
            "background-color": "#474a4d"
          }
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

