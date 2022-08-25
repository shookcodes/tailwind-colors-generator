module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-gray-50",
    "text-gray-800",
    "text-slate-50",
    "text-slate-700",
    "text-slate-800",
    "h-128",
    "h-0",
    "translate-y-4",
    "shadow-xl",
    "opacity-100",
    "z-50",
    "-translate-y-full",
    "shadow-none",
    "opacity-0",
    "z-10",
    "hidden",
    "animate-slideInDown",
  ],
  theme: {
    extend: {
      spacing: {
        120: "480px",
        128: "512px",
      },
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
          "0%": { transform: "scale(0, 0)", height: 0, width: 0, opacity: 0 },
          "100%": {
            transform: "scale(1, 1)",
            height: "full",
            width: "full",
            opacity: 1,
          },
        },
        slideInDown: {
          "0%": {
            transform: "scaleY(0)",
            "max-height": 0,
            height: 0,
            // width: 0,
            opacity: 0,
          },
          "100%": {
            transform: "scaleY(1)",
            height: "500px",
            "max-height": "500px",
            // width: "full",
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
