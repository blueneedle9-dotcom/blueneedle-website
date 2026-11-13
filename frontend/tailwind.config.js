/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep Navy / Medical Sapphire Palette
        "primary": "#0F2942",            // Deep Surgical Navy (was #0d2725 dark forest)
        "primary-container": "#1E4B75",  // Rich Medical Blue (was #243d3a dark emerald)
        "primary-fixed": "#D8E6F5",      // Ice Sapphire Tint (was #cce8e4 pale green)
        "primary-fixed-dim": "#AEC9E6",  // Soft Slate Blue (was #b0ccc8)
        "on-primary": "#ffffff",
        "on-primary-container": "#93BFE6",
        "on-primary-fixed": "#071D33",
        "on-primary-fixed-variant": "#153B60",
        "inverse-primary": "#AEC9E6",

        // Backgrounds & Surfaces (Crisp Clinical Blue-White)
        "surface": "#F4F7FB",            // Crisp surgical paper white with soft cyan/blue undertone (was #f5fbf7 greenish)
        "surface-bright": "#F8FAFD",
        "surface-dim": "#D8E1EC",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#EEF3F8",  // Clean Cool Slate-Blue White (was #eff5f1 greenish)
        "surface-container": "#E5ECF4",      // Soft Cool Grey-Blue (was #e9efec greenish)
        "surface-container-high": "#DBE4EF",
        "surface-container-highest": "#D1DCE8",
        "surface-variant": "#D1DCE8",
        "surface-tint": "#1E4B75",
        "background": "#F4F7FB",

        // Typography & On-Surfaces
        "on-surface": "#0C1929",         // Midnight Navy Black (was #171d1b)
        "on-surface-variant": "#3E4C59", // Steel Slate (was #414847)
        "on-background": "#0C1929",
        "inverse-surface": "#1B2735",
        "inverse-on-surface": "#EEF3F8",

        // Outlines & Borders
        "outline": "#6B7C8E",            // Cool Slate outline (was #727877)
        "outline-variant": "#C0CDDB",    // Soft Clinical Silver-Blue border (was #c1c8c6)

        // Secondary & Warm Medical Accents (Gold Rings / Tungsten Carbide Indicators)
        "secondary": "#4B5B6D",
        "secondary-container": "#DCE5EE",
        "secondary-fixed": "#E2E8F0",
        "secondary-fixed-dim": "#CBD5E1",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#202E3D",
        "on-secondary-fixed": "#0F1A24",
        "on-secondary-fixed-variant": "#334150",

        "tertiary": "#8A5B14",           // Refined Instrument Gold (for TC gold ring inlays)
        "tertiary-container": "#52360B",
        "tertiary-fixed": "#F8EBD4",
        "tertiary-fixed-dim": "#E5CDA3",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#E5CDA3",
        "on-tertiary-fixed": "#2C1B03",
        "on-tertiary-fixed-variant": "#5E3E0C",

        // Error States
        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#ffffff",
        "on-error-container": "#93000A",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "space-xs": "0.25rem",
        "gutter-mobile": "1rem",
        "gutter": "1.5rem",
        "space-sm": "0.5rem",
        "margin": "3rem",
        "margin-mobile": "1.25rem",
        "space-xxl": "4rem",
        "space-md": "1rem",
        "space-xl": "2.5rem",
        "space-lg": "1.5rem",
      },
      fontFamily: {
        "headline-xl-mobile": ["Manrope", "sans-serif"],
        "headline-sm": ["Manrope", "sans-serif"],
        "label-lg": ["Manrope", "sans-serif"],
        "body-lg": ["Manrope", "sans-serif"],
        "headline-xl": ["Manrope", "sans-serif"],
        "label-sm": ["Manrope", "sans-serif"],
        "headline-md": ["Manrope", "sans-serif"],
        "body-md": ["Manrope", "sans-serif"],
        "headline-lg-mobile": ["Manrope", "sans-serif"],
        "body-sm": ["Manrope", "sans-serif"],
        "label-md": ["Manrope", "sans-serif"],
        "headline-lg": ["Manrope", "sans-serif"],
        sans: ["Manrope", "sans-serif"],
      },
      fontSize: {
        "headline-xl-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "-0.005em", fontWeight: "500" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-sm": ["10px", { lineHeight: "14px", letterSpacing: "0.06em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-md": ["15px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" }],
        "headline-lg-mobile": ["26px", { lineHeight: "34px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-sm": ["13px", { lineHeight: "20px", letterSpacing: "0.005em", fontWeight: "400" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "600" }],
        "headline-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.015em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};
