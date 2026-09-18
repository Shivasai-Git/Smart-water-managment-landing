/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
        "colors": {
              "on-surface-variant": "#47464a",
              "primary-fixed": "#e5e1e4",
              "surface-tint": "#5f5e60",
              "tertiary": "#000000",
              "background": "#f8f9fa",
              "on-primary-fixed": "#1c1b1d",
              "surface-variant": "#e1e3e4",
              "secondary": "#006c49",
              "on-tertiary-fixed-variant": "#38485d",
              "surface-container-highest": "#e1e3e4",
              "outline-variant": "#c8c5ca",
              "on-secondary-fixed-variant": "#005236",
              "primary-fixed-dim": "#c8c6c8",
              "primary": "#000000",
              "surface-container-lowest": "#ffffff",
              "surface": {
                    "DEFAULT": "#F8F9FA",
                    "card": "#FFFFFF",
                    "muted": "#F1F3F5",
                    "subtle": "#E9ECEF"
              },
              "on-error-container": "#93000a",
              "primary-container": "#1c1b1d",
              "secondary-fixed-dim": "#4edea3",
              "on-background": "#191c1d",
              "surface-container-low": "#f3f4f5",
              "on-primary-container": "#858386",
              "surface-dim": "#d9dadb",
              "on-error": "#ffffff",
              "secondary-fixed": "#6ffbbe",
              "secondary-container": "#6cf8bb",
              "on-primary": "#ffffff",
              "inverse-primary": "#c8c6c8",
              "on-primary-fixed-variant": "#474649",
              "error-container": "#ffdad6",
              "on-tertiary": "#ffffff",
              "tertiary-container": "#0b1c30",
              "surface-bright": "#f8f9fa",
              "on-tertiary-fixed": "#0b1c30",
              "error": "#ba1a1a",
              "tertiary-fixed": "#d3e4fe",
              "on-secondary-fixed": "#002113",
              "on-secondary-container": "#00714d",
              "outline": "#78767b",
              "surface-container-high": "#e7e8e9",
              "inverse-surface": "#2e3132",
              "inverse-on-surface": "#f0f1f2",
              "on-surface": "#191c1d",
              "tertiary-fixed-dim": "#b7c8e1",
              "on-secondary": "#ffffff",
              "surface-container": "#edeeef",
              "on-tertiary-container": "#75859d",
              "ink": {
                    "DEFAULT": "#04121E",
                    "50": "#F8FAFC",
                    "100": "#F1F5F9",
                    "200": "#E2E8F0",
                    "300": "#CBD5E1",
                    "400": "#94A3B8",
                    "500": "#64748B",
                    "600": "#475569",
                    "700": "#334155",
                    "800": "#1E293B",
                    "900": "#0F172A",
                    "950": "#09090B"
              },
              "ink2": "#0A2135",
              "mist": "#E4EFFA",
              "steel": "#7C99BA",
              "aqua": "#3FA9F0",
              "saffron": "#FFA03C",
              "brand": {
                    "dark": "#0A0D12",
                    "black": "#09090B",
                    "gray": "#64748B",
                    "border": "#E2E8F0",
                    "emerald": "#10B981",
                    "cyan": "#06B6D4",
                    "blue": "#0284C7"
              },
              "obsidian": "#09090B",
              "canvas": "#F8F9FA",
              "accent": "#0284C7",
              "subtle": "#64748B",
              "borderLight": "rgba(226, 232, 240, 0.8)"
        },
        "borderRadius": {
              "m3": "1rem",
              "m3-lg": "2rem",
              "m3-xl": "3rem",
              "4xl": "32px"
        },
        "spacing": {
              "space-md": "1.25rem",
              "space-sm": "0.75rem",
              "margin": "2rem",
              "gutter": "1.5rem",
              "gutter-lg": "2rem",
              "space-xl": "3rem",
              "gutter-sm": "1rem",
              "margin-lg": "3rem",
              "margin-sm": "1rem",
              "space-xs": "0.375rem",
              "space-lg": "2rem"
        },
        "fontFamily": {
              "body-lg": [
                    "Plus Jakarta Sans"
              ],
              "headline-lg": [
                    "Plus Jakarta Sans"
              ],
              "label-metric": [
                    "Plus Jakarta Sans"
              ],
              "headline-xl": [
                    "Plus Jakarta Sans"
              ],
              "body-sm": [
                    "Plus Jakarta Sans"
              ],
              "label-uppercase": [
                    "Plus Jakarta Sans"
              ],
              "body-md": [
                    "Plus Jakarta Sans"
              ],
              "headline-md": [
                    "Plus Jakarta Sans"
              ],
              "label-metric-mobile": [
                    "Plus Jakarta Sans"
              ],
              "display-lg-mobile": [
                    "Plus Jakarta Sans"
              ],
              "display-lg": [
                    "Plus Jakarta Sans"
              ],
              "headline-sm": [
                    "Plus Jakarta Sans"
              ],
              "headline-xl-mobile": [
                    "Plus Jakarta Sans"
              ],
              "label-button": [
                    "Plus Jakarta Sans"
              ],
              "dash": [
                    "Inter",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "sans-serif"
              ],
              "dashmono": ["IBM Plex Mono", "monospace"],
              "display": [
                    "\"Bricolage Grotesque\"",
                    "sans-serif"
              ],
              "body": [
                    "\"IBM Plex Sans\"",
                    "sans-serif"
              ],
              "mono": [
                    "\"IBM Plex Mono\"",
                    "monospace"
              ],
              "jakarta": [
                    "Plus Jakarta Sans",
                    "sans-serif"
              ]
        },
        "fontSize": {
              "body-lg": [
                    "16px",
                    {
                          "lineHeight": "26px",
                          "letterSpacing": "-0.005em",
                          "fontWeight": "400"
                    }
              ],
              "headline-lg": [
                    "28px",
                    {
                          "lineHeight": "36px",
                          "letterSpacing": "-0.02em",
                          "fontWeight": "600"
                    }
              ],
              "label-metric": [
                    "32px",
                    {
                          "lineHeight": "36px",
                          "letterSpacing": "-0.02em",
                          "fontWeight": "500"
                    }
              ],
              "headline-xl": [
                    "40px",
                    {
                          "lineHeight": "48px",
                          "letterSpacing": "-0.025em",
                          "fontWeight": "600"
                    }
              ],
              "body-sm": [
                    "12px",
                    {
                          "lineHeight": "18px",
                          "fontWeight": "400"
                    }
              ],
              "label-uppercase": [
                    "11px",
                    {
                          "lineHeight": "16px",
                          "letterSpacing": "0.12em",
                          "fontWeight": "600"
                    }
              ],
              "body-md": [
                    "14px",
                    {
                          "lineHeight": "22px",
                          "fontWeight": "400"
                    }
              ],
              "headline-md": [
                    "22px",
                    {
                          "lineHeight": "28px",
                          "letterSpacing": "-0.015em",
                          "fontWeight": "600"
                    }
              ],
              "label-metric-mobile": [
                    "24px",
                    {
                          "lineHeight": "28px",
                          "letterSpacing": "-0.01em",
                          "fontWeight": "500"
                    }
              ],
              "display-lg-mobile": [
                    "36px",
                    {
                          "lineHeight": "44px",
                          "letterSpacing": "-0.02em",
                          "fontWeight": "600"
                    }
              ],
              "display-lg": [
                    "56px",
                    {
                          "lineHeight": "64px",
                          "letterSpacing": "-0.03em",
                          "fontWeight": "600"
                    }
              ],
              "headline-sm": [
                    "18px",
                    {
                          "lineHeight": "24px",
                          "letterSpacing": "-0.01em",
                          "fontWeight": "600"
                    }
              ],
              "headline-xl-mobile": [
                    "28px",
                    {
                          "lineHeight": "36px",
                          "letterSpacing": "-0.02em",
                          "fontWeight": "600"
                    }
              ],
              "label-button": [
                    "13px",
                    {
                          "lineHeight": "18px",
                          "letterSpacing": "0.01em",
                          "fontWeight": "600"
                    }
              ]
        },
        "maxWidth": {
              "shell": "1180px"
        },
        "boxShadow": {
              "luxury": "0 20px 50px -12px rgba(15, 23, 42, 0.08), 0 1px 3px 0 rgba(15, 23, 42, 0.04)",
              "pill": "0 2px 8px rgba(0, 0, 0, 0.04)",
              "inner-soft": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)"
        }
  },
  },
  plugins: [],
}
