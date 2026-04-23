/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        accent: '#c8f04d',
        muted: '#6b6b80',
      },
    },
  },
  plugins: [],
}
