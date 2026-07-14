import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary": "#ffffff",
        "on-primary-container": "#7c839b",
        "on-primary": "#ffffff",
        "inverse-surface": "#2d3133",
        "surface-dim": "#d8dadc",
        "on-tertiary-container": "#76859b",
        "surface-container": "#eceef0",
        "outline": "#76777d",
        "on-tertiary": "#ffffff",
        "on-primary-fixed-variant": "#3f465c",
        "surface-variant": "#e0e3e5",
        "surface-bright": "#f7f9fb",
        "on-tertiary-fixed-variant": "#3a485c",
        "surface-container-highest": "#e0e3e5",
        "tertiary-fixed": "#d5e3fd",
        "secondary-fixed-dim": "#ffb690",
        "surface": "#f7f9fb",
        "on-surface": "#191c1e",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#131b2e",
        "on-tertiary-fixed": "#0d1c2f",
        "tertiary-container": "#0d1c2f",
        "primary-fixed": "#dae2fd",
        "outline-variant": "#c6c6cd",
        "on-secondary-container": "#5c2400",
        "error": "#ba1a1a",
        "secondary-fixed": "#ffdbca",
        "secondary-container": "#fd761a",
        "surface-container-low": "#f2f4f6",
        "background": "#f7f9fb",
        "surface-tint": "#565e74",
        "inverse-primary": "#bec6e0",
        "inverse-on-surface": "#eff1f3",
        "on-background": "#191c1e",
        "on-secondary-fixed": "#341100",
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#bec6e0",
        "primary": "#000000",
        "on-surface-variant": "#45464d",
        "surface-container-high": "#e6e8ea",
        "tertiary": "#000000",
        "tertiary-fixed-dim": "#b9c7e0",
        "on-secondary-fixed-variant": "#783200",
        "secondary": "#9d4300",
        "error-container": "#ffdad6",
        "primary-container": "#131b2e",
        "on-error": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "container-max": "1280px",
        "xl": "64px",
        "md": "24px",
        "xs": "8px",
        "sm": "16px",
        "base": "4px",
        "gutter": "24px",
        "lg": "40px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "button-text": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "display-lg": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-technical": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "button-text": ["14px", { "lineHeight": "20px", "fontWeight": "600" }],
        "headline-lg-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};
export default config;
