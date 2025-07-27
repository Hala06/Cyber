'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    glow: string;
    success: string;
    warning: string;
    error: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  dark: {
    primary: '#00ffff',
    secondary: '#ff00ff', 
    accent: '#00ff00',
    background: 'rgb(6, 11, 25)',
    surface: 'rgba(15, 23, 42, 0.8)',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    border: 'rgba(0, 255, 255, 0.3)',
    glow: '#00ffff',
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff3366'
  },
  light: {
    primary: '#0066ff',
    secondary: '#6600ff',
    accent: '#00cc66', 
    background: 'rgb(248, 250, 252)',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: 'rgba(0, 102, 255, 0.3)',
    glow: '#0066ff',
    success: '#00aa55',
    warning: '#ff8800',
    error: '#ee2244'
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved && (saved === 'dark' || saved === 'light')) {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const colors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <div 
        className={`min-h-screen transition-all duration-500 ${theme}`}
        style={{ 
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, rgb(6, 11, 25) 0%, rgb(15, 23, 42) 50%, rgb(30, 41, 59) 100%)'
            : 'linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 50%, rgb(226, 232, 240) 100%)'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
