/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        forge: {
          bg: "var(--forge-bg)",
          "bg-soft": "var(--forge-bg-soft)",
          surface: "var(--forge-surface)",
          "surface-raised": "var(--forge-surface-raised)",
          "surface-hover": "var(--forge-surface-hover)",
          border: "var(--forge-border)",
          "border-hover": "var(--forge-border-hover)",
          text: "var(--forge-text)",
          "text-dim": "var(--forge-text-dim)",
          "text-faint": "var(--forge-text-faint)",
        },
        ember: {
          DEFAULT: "#E8963C",
          hot: "#F2B457",
          dim: "#C97D2D",
          glow: "#FFD08A",
        },
        signal: {
          success: "#5FBF7A",
          "success-dim": "#3E8557",
          danger: "#E15252",
          "danger-dim": "#A83B3B",
          warning: "#E0B84C",
          info: "#5B9DD9",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        ember: "0 0 0 1px rgba(232,150,60,0.35), 0 0 24px rgba(232,150,60,0.15)",
        panel: "0 8px 24px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "forge-grid":
          "linear-gradient(rgba(232,150,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,150,60,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        ember: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        spark: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.9" },
          "100%": { transform: "translateY(-40px) scale(0.3)", opacity: "0" },
        },
      },
      animation: {
        ember: "ember 2.4s ease-in-out infinite",
        "slide-up": "slide-up 0.35s ease-out",
        spark: "spark 1.6s ease-out infinite",
      },
    },
  },
  plugins: [],
};
