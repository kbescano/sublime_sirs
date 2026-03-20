/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Targets the entire src folder
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Fallback for root app directory
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
};