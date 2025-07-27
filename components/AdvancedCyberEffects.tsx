"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface AdvancedCyberEffectsProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdvancedCyberEffects({ children, className = "" }: AdvancedCyberEffectsProps) {
  const { colors } = useTheme();

  return (
    <div className={`relative ${className}`}>
      {/* Holographic scan lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`scanline-${i}`}
            className="absolute w-full h-0.5 opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}80, ${colors.primary}40, transparent)`,
              top: `${i * 16.67}%`,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3.5 + Math.random() * 1.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Digital rain effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute text-xs font-mono opacity-60"
            style={{
              color: colors.primary,
              left: `${(i * 10) % 100}%`,
              fontFamily: 'monospace',
            }}
            animate={{
              y: ["-100px", "100vh"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {Array.from({ length: Math.floor(Math.random() * 8) + 3 }).map((_, j) => (
              <div key={j} style={{ marginBottom: '2px' }}>
                {Math.random().toString(36).substring(2, 3)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Glitch effect overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`glitch-${i}`}
            className="absolute w-full h-1 opacity-20"
            style={{
              background: colors.secondary,
              top: `${Math.random() * 100}%`,
              mixBlendMode: 'screen'
            }}
            animate={{
              x: [0, 10, -10, 0],
              opacity: [0, 0.8, 0],
              scaleX: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatDelay: 2.5 + Math.random() * 4.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating data packets */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`packet-${i}`}
            className="absolute w-2 h-8 rounded-full opacity-40"
            style={{
              background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.4, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Pulsing energy rings */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 opacity-20"
            style={{
              borderColor: i % 2 === 0 ? colors.primary : colors.secondary,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{
              scale: [0.9, 1.4, 0.9],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Neural network connections */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.svg
            key={`neural-${i}`}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              width: '150px',
              height: '150px',
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3.5 + Math.random() * 2.5,
              repeat: Infinity,
              delay: Math.random() * 3.5,
            }}
          >
            <defs>
              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d={`M10,10 Q100,${50 + Math.random() * 100} 190,190`}
              stroke={`url(#gradient-${i})`}
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <circle cx="10" cy="10" r="3" fill={colors.primary} opacity="0.8" />
            <circle cx="190" cy="190" r="3" fill={colors.secondary} opacity="0.8" />
          </motion.svg>
        ))}
      </div>

      {/* Holographic HUD elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top left corner */}
        <motion.div
          className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 opacity-40"
          style={{ borderColor: colors.primary }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Bottom right corner */}
        <motion.div
          className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 opacity-40"
          style={{ borderColor: colors.secondary }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1.2,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
