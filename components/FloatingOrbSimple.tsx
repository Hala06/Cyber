"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// Simple 2D animated orb that looks 3D
export default function FloatingOrb({ className = "", style = {} }) {
  const { colors } = useTheme();

  return (
    <div className={`w-full h-full relative ${className}`} style={style}>
      {/* Main orb */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="relative w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.primary}80, ${colors.secondary}40, ${colors.primary}20)`,
            boxShadow: `
              0 0 60px ${colors.glow}60,
              inset 0 0 30px ${colors.primary}30,
              0 0 100px ${colors.secondary}30
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {/* Inner core */}
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{
              background: `radial-gradient(circle at 40% 40%, ${colors.primary}, transparent)`,
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Glowing ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 opacity-80"
            style={{
              borderColor: colors.secondary,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Orbital particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors.primary,
            left: '50%',
            top: '50%',
            boxShadow: `0 0 10px ${colors.glow}`,
            transformOrigin: `${40 + i * 5}px center`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            rotate: {
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }
          }}
        />
      ))}

      {/* Energy waves */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 rounded-full border opacity-30"
          style={{
            borderColor: i % 2 === 0 ? colors.primary : colors.secondary,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [0.5, 2.5, 0.5],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
