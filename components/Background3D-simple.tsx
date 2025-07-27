'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function Background3D() {
  const { colors } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 30%, ${colors.primary}20 0%, transparent 50%), 
                       radial-gradient(circle at 80% 70%, ${colors.secondary}20 0%, transparent 50%),
                       ${colors.background}`
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${colors.primary}20 0%, transparent 50%), 
             radial-gradient(circle at 80% 70%, ${colors.secondary}20 0%, transparent 50%),
             ${colors.background}`,
            `radial-gradient(circle at 80% 30%, ${colors.primary}30 0%, transparent 50%), 
             radial-gradient(circle at 20% 70%, ${colors.secondary}30 0%, transparent 50%),
             ${colors.background}`,
            `radial-gradient(circle at 20% 30%, ${colors.primary}20 0%, transparent 50%), 
             radial-gradient(circle at 80% 70%, ${colors.secondary}20 0%, transparent 50%),
             ${colors.background}`
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            border: `1px solid ${colors.primary}40`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            rotate: [0, 360],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
