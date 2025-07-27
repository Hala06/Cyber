"use client";

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import the entire component to avoid SSR issues
const OrbCanvas = dynamic(() => import('./ThreeJSOrbLoader').then(mod => mod.ThreeJSOrbCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-80 h-80 rounded-full bg-cyan-900/20 animate-pulse">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20" />
    </div>
  )
});

// Main 3D Orb Component
export default function RealOrb3D() {
  return (
    <motion.div 
      className="relative w-full h-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Status indicator */}
      <div className="absolute top-2 left-2 z-10 text-xs font-mono text-cyan-400 bg-black/20 px-2 py-1 rounded border border-cyan-500/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          HOLOGRAPHIC ORB ACTIVE
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute top-5 right-5 w-80 h-80 z-50">
        <OrbCanvas />
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-400/20 via-blue-500/10 to-transparent animate-pulse pointer-events-none" />
      
      {/* Holographic scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/5 to-transparent animate-pulse" 
             style={{ 
               backgroundSize: '100% 20px',
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0, 255, 255, 0.03) 20px)'
             }} 
        />
      </div>
    </motion.div>
  );
}
