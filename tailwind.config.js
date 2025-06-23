/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "disabled-bg": "#e5e7eb",
        "disabled-text": "#9ca3af",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in",
        "fade-out": "fadeOut 0.8s ease-in",
        blink: "blink 1s step-start infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "tab-active",
    "tab-inactive",
    "btn-primary",
    "btn-secondary",
    "btn-cancel",
    "util-disabled",
    "text-responsive-sm",
  ],
};
