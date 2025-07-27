'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Lock, User, ArrowRight, Shield, Terminal, Zap, Sun, Moon } from 'lucide-react';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const { login } = useGame();
  const { theme, toggleTheme, colors } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    setStep(1);
    
    // Simulate neural link initialization
    await new Promise(resolve => setTimeout(resolve, 800));
    setStep(2);
    await new Promise(resolve => setTimeout(resolve, 800));
    setStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login(username.trim());
    setIsLoading(false);
  };

  const loadingSteps = [
    "Initializing Neural Interface...",
    "Establishing Quantum Connection...",
    "Accessing CyberForge Database...",
    "Welcome to the Matrix."
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: colors.background }}
    >
      {/* Animated cyber grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary}30 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}30 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: colors.primary,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 43) % 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.2) % 3,
            }}
          />
        ))}
      </div>

      {/* Theme toggle button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full z-50"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
          border: `1px solid ${colors.border}`,
          color: colors.text,
          backdropFilter: 'blur(10px)'
        }}
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-md w-full mx-4 relative z-10"
        style={{ perspective: '1000px' }}
      >
        {/* Main login card */}
        <motion.div
          className="relative p-8 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.surface}90, ${colors.surface}60)`,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 20px 40px ${colors.background}40`
          }}
          whileHover={{
            boxShadow: `0 0 50px ${colors.glow}30`
          }}
        >
          {/* Cyber grid overlay */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(${colors.primary}40 1px, transparent 1px),
                linear-gradient(90deg, ${colors.primary}40 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Glowing border effect */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20, transparent)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              padding: '1px'
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  boxShadow: `0 0 30px ${colors.glow}50`
                }}
                animate={{ 
                  boxShadow: [
                    `0 0 30px ${colors.glow}50`,
                    `0 0 50px ${colors.glow}80`,
                    `0 0 30px ${colors.glow}50`
                  ],
                  rotate: [0, 360]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity },
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 
                className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}
              >
                CyberForge
              </h1>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Initialize Neural Connection
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isLoading ? (
                <motion.form
                  key="login-form"
                  onSubmit={handleLogin}
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Username field */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                      style={{ color: colors.textSecondary }}
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter neural ID..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none placeholder:opacity-60"
                      style={{
                        background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}60)`,
                        border: `2px solid ${colors.border}`,
                        color: colors.text,
                        backdropFilter: 'blur(10px)',
                        caretColor: colors.primary
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = colors.primary;
                        e.target.style.boxShadow = `0 0 20px ${colors.glow}40`;
                        e.target.style.background = `linear-gradient(135deg, ${colors.surface}90, ${colors.surface}70)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = colors.border;
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}60)`;
                      }}
                    />
                  </motion.div>

                  {/* Login button */}
                  <motion.button
                    type="submit"
                    disabled={!username.trim()}
                    className="w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3"
                    style={{
                      background: username.trim() 
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                        : `${colors.textSecondary}40`,
                      color: username.trim() ? '#ffffff' : colors.textSecondary,
                      border: `2px solid ${username.trim() ? colors.primary : colors.textSecondary}40`,
                      cursor: username.trim() ? 'pointer' : 'not-allowed'
                    }}
                    whileHover={username.trim() ? { 
                      scale: 1.02,
                      boxShadow: `0 0 30px ${colors.glow}50`
                    } : {}}
                    whileTap={username.trim() ? { scale: 0.98 } : {}}
                  >
                    <Terminal className="w-5 h-5" />
                    Initialize Neural Link
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="loading"
                  className="text-center space-y-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                >
                  {/* Loading animation */}
                  <motion.div
                    className="relative w-24 h-24 mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-t-transparent"
                      style={{ borderColor: `${colors.primary} transparent transparent transparent` }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${colors.glow}40`,
                          `0 0 40px ${colors.glow}80`,
                          `0 0 20px ${colors.glow}40`
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Status text */}
                  <motion.p
                    key={step}
                    className="text-lg font-medium"
                    style={{ color: colors.text }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loadingSteps[step]}
                  </motion.p>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: i <= step ? colors.primary : `${colors.textSecondary}40`
                        }}
                        animate={i <= step ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        } : {}}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          className="text-center mt-6 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            A neural interface for cybersecurity training
          </p>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" style={{ color: colors.success }} />
            <span className="text-xs" style={{ color: colors.success }}>
              Quantum Encrypted Connection
            </span>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}
