import tailwindAnimate from "tailwindcss-animate";

const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/forms/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/maps/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/site/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/ui/accordion.tsx",
    "./components/ui/button.tsx",
    "./components/ui/checkbox.tsx",
    "./components/ui/dialog.tsx",
    "./components/ui/input.tsx",
    "./components/ui/label.tsx",
    "./components/ui/select.tsx",
    "./components/ui/sheet.tsx",
    "./components/ui/textarea.tsx",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: withOpacity("--tw-border"),
        input: withOpacity("--tw-input"),
        ring: withOpacity("--tw-ring"),
        background: withOpacity("--tw-background"),
        foreground: withOpacity("--tw-foreground"),
        primary: {
          DEFAULT: withOpacity("--tw-primary"),
          foreground: withOpacity("--tw-primary-foreground"),
        },
        secondary: {
          DEFAULT: withOpacity("--tw-secondary"),
          foreground: withOpacity("--tw-secondary-foreground"),
        },
        destructive: {
          DEFAULT: withOpacity("--tw-destructive"),
          foreground: "rgb(255 255 255 / <alpha-value>)",
        },
        muted: {
          DEFAULT: withOpacity("--tw-muted"),
          foreground: withOpacity("--tw-muted-foreground"),
        },
        accent: {
          DEFAULT: withOpacity("--tw-accent"),
          foreground: withOpacity("--tw-accent-foreground"),
        },
        popover: {
          DEFAULT: withOpacity("--tw-popover"),
          foreground: withOpacity("--tw-popover-foreground"),
        },
        card: {
          DEFAULT: withOpacity("--tw-card"),
          foreground: withOpacity("--tw-card-foreground"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
