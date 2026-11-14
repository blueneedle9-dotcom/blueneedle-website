/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Stitch Project 7153368526675506693 Exact Palette
        "primary": "#00274c",
        "primary-container": "#0f3d6c",
        "primary-fixed": "#d4e3ff",
        "primary-fixed-dim": "#a4c9ff",
        "on-primary": "#ffffff",
        "on-primary-container": "#84a9de",
        "on-primary-fixed": "#001c39",
        "on-primary-fixed-variant": "#1e4877",
        "inverse-primary": "#a4c9ff",

        // Secondary & Surgical Accents
        "secondary": "#006877",
        "secondary-container": "#76e7fd",
        "secondary-fixed": "#a3eeff",
        "secondary-fixed-dim": "#63d6ec",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#006775",
        "on-secondary-fixed": "#001f25",
        "on-secondary-fixed-variant": "#004e5a",

        // Tertiary Deep Surgical Blue
        "tertiary": "#00274b",
        "tertiary-container": "#003d70",
        "tertiary-fixed": "#d3e3ff",
        "tertiary-fixed-dim": "#a3c9ff",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#7aa9e8",
        "on-tertiary-fixed": "#001c38",
        "on-tertiary-fixed-variant": "#054881",

        // Crisp Sterile Clinical Surfaces
        "surface": "#f8f9ff",
        "surface-bright": "#f8f9ff",
        "surface-dim": "#cbdbf5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container": "#e5eeff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-variant": "#d3e4fe",
        "surface-tint": "#396091",
        "background": "#f8f9ff",

        // Clinical Typography & On-Surfaces
        "on-surface": "#0b1c30",
        "on-surface-variant": "#43474f",
        "on-background": "#0b1c30",
        "inverse-surface": "#213145",
        "inverse-on-surface": "#eaf1ff",

        // Outlines & Borders
        "outline": "#737780",
        "outline-variant": "#c3c6d0",

        // Error States
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-xxl": "4rem",
        "gutter-mobile": "1rem",
        "gutter": "1.5rem",
        "margin": "3rem",
        "margin-mobile": "1rem",
      },
      fontFamily: {
        "headline-xl": ["Plus Jakarta Sans", "sans-serif"],
        "headline-xl-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "headline-xl": ["40px", { lineHeight: "48px", fontWeight: "700" }],
        "headline-xl-mobile": ["30px", { lineHeight: "38px", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-md": ["22px", { lineHeight: "28px", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "18px", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "label-sm": ["11px", { lineHeight: "14px", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};
