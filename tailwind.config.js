// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using the 'dark' class on the html element
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1E40AF', // Deep blue for light mode
          dark: '#60A5FA', // Lighter blue for dark mode
        },
        secondary: {
          light: '#F3F4F6', // Light gray for light mode
          dark: '#1F2937', // Dark gray for dark mode
        },
        warning: {
          light: '#DC2626', // Red for light mode
          dark: '#F87171', // Lighter red for dark mode
        },
        text: {
          light: '#1F2937', // Dark gray for light mode text
          dark: '#E5E7EB', // Light gray for dark mode text
        },
        background: {
          light: '#F9FAFB', // Light background for light mode
          dark: '#111827', // Dark background for dark mode
        },
      },
    },
  },
  plugins: [],
};