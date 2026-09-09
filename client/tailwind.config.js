/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Text'",
          "'SF Pro Display'",
          "'Inter'",
          "system-ui",
          "sans-serif"
        ],
        serif: [
          "'Newsreader'",
          "'Charter'",
          "'Georgia'",
          "'Cambria'",
          "serif"
        ],
        mono: [
          "'SF Mono'",
          "'JetBrains Mono'",
          "'Menlo'",
          "'Monaco'",
          "monospace"
        ],
      },
      colors: {
        apple: {
          bg: "#FBFBFD",
          surface: "#FFFFFF",
          subtle: "#F5F5F7",
          border: "#E5E5EA",
          darkBorder: "#27272a",
          darkBg: "#09090b",
          darkSurface: "#121214",
          darkSubtle: "#1c1c1f",
          text: "#1D1D1F",
          secondary: "#86868B",
          accent: "#0071E3",
          accentHover: "#0077ED",
          warning: "#F59E0B",
          error: "#EF4444",
          success: "#10B981",
        }
      },
      boxShadow: {
        'apple-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'apple': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'apple-lg': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'apple-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        'apple': '20px',
      }
    },
  },
  plugins: [],
}
