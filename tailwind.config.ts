import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f5ff",
          purple: "#a855f7",
          pink: "#ec4899",
          blue: "#3b82f6",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.08)",
          dark: "rgba(15, 23, 42, 0.6)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        spinSlow: "spin 12s linear infinite",
        float3d: "float-3d 8s ease-in-out infinite",
        holographic: "holographic-shift 4s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "blur(20px)" },
          "50%": { opacity: "1", filter: "blur(30px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-gradient":
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #0c4a6e 50%, #312e81 75%, #0f172a 100%)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)",
        "neon-lg":
          "0 0 30px rgba(0, 245, 255, 0.5), 0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255,255,255,0.05)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
