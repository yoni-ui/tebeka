import type { Config } from "tailwindcss";

/** Stitch / LexiGen design tokens — tonal surfaces (see DESIGN.md). */
const stitchColors = {
  error: "#ba1a1a",
  "tertiary-container": "#bf3003",
  "surface-dim": "#d2d9f4",
  "primary-container": "#0052ff",
  "surface-container-lowest": "#ffffff",
  "surface-container": "#eaedff",
  "on-tertiary": "#ffffff",
  "primary-fixed-dim": "#b7c4ff",
  "on-tertiary-fixed": "#3c0800",
  surface: "#faf8ff",
  "on-error-container": "#93000a",
  "inverse-on-surface": "#eef0ff",
  "secondary-container": "#d5e3fc",
  tertiary: "#952200",
  "on-secondary-fixed-variant": "#3a485b",
  "on-surface": "#131b2e",
  "on-background": "#131b2e",
  "error-container": "#ffdad6",
  "on-tertiary-fixed-variant": "#891e00",
  "surface-variant": "#dae2fd",
  "surface-bright": "#faf8ff",
  "secondary-fixed-dim": "#b9c7df",
  "surface-container-high": "#e2e7ff",
  "surface-tint": "#004ced",
  "surface-container-low": "#f2f3ff",
  primary: "#003ec7",
  "on-secondary-fixed": "#0d1c2e",
  background: "#faf8ff",
  "on-surface-variant": "#434656",
  "on-primary-fixed-variant": "#0038b6",
  "secondary-fixed": "#d5e3fc",
  "on-error": "#ffffff",
  "primary-fixed": "#dde1ff",
  "inverse-surface": "#283044",
  "inverse-primary": "#b7c4ff",
  "on-primary-container": "#dfe3ff",
  "tertiary-fixed": "#ffdbd2",
  outline: "#737688",
  "surface-container-highest": "#dae2fd",
  "on-secondary": "#ffffff",
  "tertiary-fixed-dim": "#ffb4a1",
  "on-primary": "#ffffff",
  "on-tertiary-container": "#ffddd5",
  secondary: "#515f74",
  "outline-variant": "#c3c5d9",
};

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: stitchColors,
      fontFamily: {
        headline: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      boxShadow: {
        cloud: "0 16px 40px rgba(19, 27, 46, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
