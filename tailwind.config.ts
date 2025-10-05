import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-48px) scale(1.03)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(80px, -80px) scale(1.06)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "200px 200px" }
        },
        "shine": {
          "0%": { transform: "translateX(-120%)" },
          "40%": { transform: "translateX(260%)" },
          "100%": { transform: "translateX(260%)" }
        },
        "spin-border": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "wave": {
          "0%, 100%": { 
            transform: "translate(-25%, -25%) scale(1)",
            opacity: "0.3"
          },
          "50%": { 
            transform: "translate(-35%, -35%) scale(1.1)",
            opacity: "0.5"
          }
        },
        "particle-flow-1": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
            transform: "translateY(0)"
          },
          "50%": { 
            backgroundPosition: "100% 50%",
            transform: "translateY(-20px)"
          }
        },
        "particle-flow-2": {
          "0%, 100%": { 
            backgroundPosition: "100% 50%",
            transform: "translateY(0) translateX(0)"
          },
          "50%": { 
            backgroundPosition: "0% 50%",
            transform: "translateY(-30px) translateX(20px)"
          }
        },
        "particle-flow-3": {
          "0%, 100%": { 
            backgroundPosition: "50% 0%",
            transform: "translateY(0) translateX(0)"
          },
          "50%": { 
            backgroundPosition: "50% 100%",
            transform: "translateY(-25px) translateX(-15px)"
          }
        },
        "wave-flow": {
          "0%": { 
            transform: "translateX(0)",
          },
          "100%": { 
            transform: "translateX(800px)",
          },
        },
        "wave-flow-reverse": {
          "0%": { 
            transform: "translateX(0)",
          },
          "100%": { 
            transform: "translateX(-800px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "gradient-shift": "gradient-shift 12s ease infinite",
        "grid-pan": "grid-pan 20s linear infinite",
        "shine": "shine 2s ease-in-out infinite",
        "spin-border": "spin-border 3s linear infinite",
        "wave": "wave 15s ease-in-out infinite",
        "particle-flow-1": "particle-flow-1 8s ease-in-out infinite",
        "particle-flow-2": "particle-flow-2 12s ease-in-out infinite",
        "particle-flow-3": "particle-flow-3 10s ease-in-out infinite",
        "wave-flow": "wave-flow 20s linear infinite",
        "wave-flow-delayed": "wave-flow 25s linear infinite",
        "wave-flow-reverse": "wave-flow-reverse 18s linear infinite",
        "wave-flow-reverse-delayed": "wave-flow-reverse 22s linear infinite",
        "wave-flow-slow": "wave-flow 30s linear infinite",
        "wave-flow-fast": "wave-flow 15s linear infinite",
        "wave-flow-medium": "wave-flow-reverse 23s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
