"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface CyberAnimationsProps {
  children: React.ReactNode;
  variant?: "matrix" | "particles" | "grid" | "waves" | "neural";
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export default function CyberAnimations({ 
  children, 
  variant = "matrix", 
  intensity = "medium",
  className = "" 
}: CyberAnimationsProps) {
  const { colors } = useTheme();

  const getAnimationCount = () => {
    switch (intensity) {
      case "low": return 8;
      case "medium": return 15;
      case "high": return 25;
      default: return 15;
    }
  };

  const renderMatrixRain = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: getAnimationCount() }).map((_, i) => (
        <motion.div
          key={`matrix-${i}`}
          className="absolute w-0.5 opacity-60"
          style={{
            height: `${Math.random() * 200 + 100}px`,
            background: `linear-gradient(180deg, transparent, ${colors.primary}80, ${colors.primary}40, transparent)`,
            left: `${(i * (100 / getAnimationCount())) % 100}%`,
          }}
          animate={{
            y: ["-100%", "100vh"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );

  const renderFloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: getAnimationCount() }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: Math.random() > 0.5 ? colors.primary : colors.secondary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );

  const renderCyberGrid = () => (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <motion.div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary}60 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}60 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Glowing intersections */}
      {Array.from({ length: Math.floor(getAnimationCount() / 4) }).map((_, i) => (
        <motion.div
          key={`grid-glow-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors.glow,
            left: `${(i * 8) % 100}%`,
            top: `${(i * 6) % 100}%`,
            boxShadow: `0 0 10px ${colors.glow}`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  const renderNeuralWaves = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: Math.floor(getAnimationCount() / 2) }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute rounded-full border-2 opacity-30"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            borderColor: i % 2 === 0 ? colors.primary : colors.secondary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );

  const renderNeuralNetwork = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Neural nodes */}
      {Array.from({ length: Math.floor(getAnimationCount() / 3) }).map((_, i) => (
        <motion.div
          key={`neuron-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors.primary,
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
            boxShadow: `0 0 8px ${colors.primary}`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      {/* Neural connections */}
      {Array.from({ length: Math.floor(getAnimationCount() / 4) }).map((_, i) => (
        <motion.div
          key={`connection-${i}`}
          className="absolute opacity-20"
          style={{
            width: `${Math.random() * 200 + 50}px`,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80 + 10}%`,
            transformOrigin: 'left',
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );

  const getAnimationVariant = () => {
    switch (variant) {
      case "matrix": return renderMatrixRain();
      case "particles": return renderFloatingParticles();
      case "grid": return renderCyberGrid();
      case "waves": return renderNeuralWaves();
      case "neural": return renderNeuralNetwork();
      default: return renderMatrixRain();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {getAnimationVariant()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
