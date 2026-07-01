/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        charcoal: "#14171C",
        graphite: "#1F242C",
        graphite2: "#272D37",
        paper: "#F6F5F2",
        ink: "#20242B",
        mute: "#6B7280",
        redline: "#D7263D",
        success: "#2E8B57",
        amber: "#E2A33D",
        line: "#E4E2DC",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
