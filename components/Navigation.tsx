'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Trophy,
  Target,
  Zap,
  Sun,
  Moon,
  Shield
} from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { gameState, logout } = useGame();
  const { theme, toggleTheme, colors } = useTheme();
  const router = useRouter();

  const menuItems = [
    { icon: Target, label: 'Dashboard', href: '/dashboard' },
    { icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-50"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div 
              className="p-2 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                border: `1px solid ${colors.border}`
              }}
            >
              <Shield className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
            <div>
              <h1 
                className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}
              >
                CyberForge
              </h1>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                CTF Platform
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => router.push(item.href)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  color: colors.text,
                  border: `1px solid transparent`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`;
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.boxShadow = `0 0 20px ${colors.glow}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* User Info & Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* User Stats */}
            <div className="hidden sm:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)`,
                  border: `1px solid ${colors.border}`
                }}
              >
                <Zap className="w-4 h-4" style={{ color: colors.accent }} />
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  {gameState.score}
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary}10, ${colors.primary}10)`,
                  border: `1px solid ${colors.border}`
                }}
              >
                <Trophy className="w-4 h-4" style={{ color: colors.secondary }} />
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  Lv.{gameState.currentLevel}
                </span>
              </motion.div>
            </div>

            {/* User Menu */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}15)`,
                border: `1px solid ${colors.border}`
              }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  {gameState.username}
                </p>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Cyber Warrior
                </p>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              borderTop: `1px solid ${colors.border}`
            }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Stats */}
              <div className="flex justify-center space-x-4 mb-6">
                <div 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)`,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <Zap className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm font-bold" style={{ color: colors.text }}>
                    {gameState.score}
                  </span>
                </div>
                <div 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary}10, ${colors.primary}10)`,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <Trophy className="w-4 h-4" style={{ color: colors.secondary }} />
                  <span className="text-sm font-bold" style={{ color: colors.text }}>
                    Lv.{gameState.currentLevel}
                  </span>
                </div>
              </div>

              {/* Mobile Menu Items */}
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    router.push(item.href);
                    setIsMenuOpen(false);
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}05, ${colors.secondary}05)`,
                    border: `1px solid ${colors.border}`,
                    color: colors.text
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}

              {/* Logout Button */}
              <motion.button
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: menuItems.length * 0.1 }}
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.error}10, ${colors.error}20)`,
                  border: `1px solid ${colors.error}30`,
                  color: colors.error
                }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyber Grid Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary}30 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}30 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </motion.nav>
  );
}
