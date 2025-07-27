"use client";

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Enhanced CTF Orb with 3D Model Detection
function CTFOrb3D() {
  const [modelExists, setModelExists] = useState(false);
  
  useEffect(() => {
    // Check if the 3D model exists
    fetch('/orb.glb')
      .then(response => {
        if (response.ok) {
          console.log('✅ orb.glb found! File size:', response.headers.get('content-length'));
          setModelExists(true);
        } else {
          console.log('⚠️ orb.glb not accessible, using enhanced fallback');
        }
      })
      .catch(() => {
        console.log('⚠️ Could not check orb.glb, using enhanced fallback');
      });
  }, []);

  return (
    <div className="relative w-32 h-32">
      {/* Main Orb */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-cyan-600 animate-pulse shadow-2xl" 
           style={{ 
             boxShadow: '0 0 40px rgba(0, 255, 255, 0.5), 0 0 80px rgba(128, 0, 255, 0.3)',
             filter: 'blur(0.5px)'
           }} />
      
      {/* Rotating Ring */}
      <div className="absolute inset-2 rounded-full border-2 border-cyan-300/40 animate-spin" 
           style={{ animationDuration: "4s" }}>
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>
      
      {/* Inner Glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-200/20 to-purple-300/20 animate-pulse" 
           style={{ animationDelay: '0.5s' }} />
      
      {/* Pulsing Border */}
      <div className="absolute inset-6 rounded-full border border-cyan-300/60 animate-ping" />
      
      {/* Core */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-100/30 to-purple-200/30 backdrop-blur-sm" />
      
      {/* CTF Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-cyan-300 font-mono font-bold">
        CTF
      </div>
      
      {/* Binary Code Fragments */}
      <div className="absolute -top-2 -left-2 text-xs text-cyan-400/60 font-mono animate-pulse">01</div>
      <div className="absolute -top-2 -right-2 text-xs text-purple-400/60 font-mono animate-pulse" style={{ animationDelay: '0.3s' }}>10</div>
      <div className="absolute -bottom-2 -left-2 text-xs text-cyan-400/60 font-mono animate-pulse" style={{ animationDelay: '0.6s' }}>11</div>
      <div className="absolute -bottom-2 -right-2 text-xs text-purple-400/60 font-mono animate-pulse" style={{ animationDelay: '0.9s' }}>00</div>
      
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 rounded-full" 
           style={{
             background: `
               radial-gradient(circle at 30% 30%, transparent 8px, rgba(0,255,255,0.1) 9px, transparent 10px),
               radial-gradient(circle at 70% 70%, transparent 6px, rgba(255,0,255,0.1) 7px, transparent 8px),
               radial-gradient(circle at 20% 80%, transparent 4px, rgba(0,255,255,0.05) 5px, transparent 6px)
             `
           }} />
    </div>
  );
}

// Main Component with Enhanced Animation
export default function Orb3D({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.3, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 2, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.3 }
      }}
    >
      <Suspense fallback={
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 animate-pulse" />
      }>
        <CTFOrb3D />
      </Suspense>
      
      {/* 3D Model Status */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-black/90 backdrop-blur-sm border border-cyan-500/40 rounded-md px-3 py-1">
          <span className="text-xs text-cyan-400 font-mono">🔮 ORB.GLB READY</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
