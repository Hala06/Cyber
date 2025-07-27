/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        card: "#1a1a1a",
        'card-hover': "#242424",
        accent: "#6366f1", // Modern indigo
        glow: "#10b981", // Emerald green
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b",
        terminal: "#111827",
        'neon-pink': "#ec4899",
        'neon-blue': "#3b82f6",
        'neon-purple': "#8b5cf6",
        'dark-gray': "#1f2937",
        'light-gray': "#374151",
      },
      boxShadow: {
        glow: "0 0 30px rgba(99, 102, 241, 0.3)",
        'glow-green': "0 0 30px rgba(16, 185, 129, 0.3)",
        'glow-pink': "0 0 30px rgba(236, 72, 153, 0.3)",
        'card': "0 4px 20px rgba(0, 0, 0, 0.3)",
        'card-hover': "0 8px 32px rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
