'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function Background3D() {
  const { colors } = useTheme();

  // Fixed positions to avoid hydration mismatch
  const shapes = [
    { width: 80, height: 80, left: 10, top: 20, isCircle: true },
    { width: 60, height: 120, left: 85, top: 15, isCircle: false },
    { width: 100, height: 70, left: 25, top: 70, isCircle: true },
    { width: 90, height: 90, left: 70, top: 80, isCircle: false },
    { width: 70, height: 110, left: 5, top: 50, isCircle: true },
    { width: 85, height: 85, left: 90, top: 45, isCircle: false },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60">
      {/* Simple animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 30%, ${colors.primary}15 0%, transparent 50%), 
                       radial-gradient(circle at 80% 70%, ${colors.secondary}15 0%, transparent 50%),
                       ${colors.background}`
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${colors.primary}15 0%, transparent 50%), 
             radial-gradient(circle at 80% 70%, ${colors.secondary}15 0%, transparent 50%),
             ${colors.background}`,
            `radial-gradient(circle at 80% 30%, ${colors.primary}20 0%, transparent 50%), 
             radial-gradient(circle at 20% 70%, ${colors.secondary}20 0%, transparent 50%),
             ${colors.background}`,
            `radial-gradient(circle at 20% 30%, ${colors.primary}15 0%, transparent 50%), 
             radial-gradient(circle at 80% 70%, ${colors.secondary}15 0%, transparent 50%),
             ${colors.background}`
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Deterministic floating geometric shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            border: `1px solid ${colors.primary}30`,
            borderRadius: shape.isCircle ? '50%' : '0%',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
