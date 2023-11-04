/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "linear-gradient( 90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2) ), url(https://storage.jirayu.pw/00016-1315674954.png);",
      },
    },
  },
  plugins: [],
};
