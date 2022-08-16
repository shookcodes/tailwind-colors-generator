module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-slate-50",
    "text-gray-800",
    "text-slate-700",
    "text-slate-800",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale (0, 0)", height: 0, width: 0, opacity: 0 },
          "100%": {
            transform: "scale (1, 1)",
            height: "full",
            width: "full",
            opacity: 1,
          },
        },
      },
      animation: {
        scaleIn: "scaleIn 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
