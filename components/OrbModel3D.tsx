"use client";

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// CTF-themed 3D Orb Component with enhanced cyber aesthetics
function CyberOrbCTF() {
  const [orbLoaded, setOrbLoaded] = useState(false);
  
  useEffect(() => {
    // Check if orb.glb exists and log the result
    fetch('/orb.glb')
      .then(response => {
        if (response.ok) {
          console.log('✅ orb.glb found! File size:', response.headers.get('content-length'));
          setOrbLoaded(true);
        } else {
          console.log('⚠️ orb.glb not found, using fallback cyber orb');
        }
      })
      .catch(() => {
        console.log('⚠️ Failed to load orb.glb, using fallback cyber orb');
      });
  }, []);
  
  return (
    <motion.div
      className="relative w-full h-full"
      animate={{
        rotateY: [0, 360],
      }}
      transition={{
        rotateY: {
          duration: 25, // Slower rotation for better performance
          repeat: Infinity,
          ease: "linear"
        }
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Main orb with CTF cyber aesthetic */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, 
              #00ffff88 0%, 
              #0088ff66 25%, 
              #ff00ff44 50%, 
              #00ffff33 75%, 
              #000000aa 100%
            )`,
          boxShadow: `
            0 0 40px #00ffff80,
            inset -15px -15px 30px #00000040,
            inset 15px 15px 30px #00ffff20,
            0 0 80px #ff00ff40
          `,
          border: '1px solid #00ffff40',
        }}
      />
      
      {/* Inner core with matrix-like effect */}
      <div
        className="absolute inset-4 rounded-full"
        style={{
          background: `
            radial-gradient(circle, 
              #00ffff66 0%, 
              transparent 40%,
              #ff00ff33 60%,
              transparent 100%
            )`,
          border: '1px solid #00ffff20',
        }}
      />
      
      {/* CTF circuit pattern overlay */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg,
              #00ffff40 45deg,
              transparent 90deg,
              #ff00ff40 135deg,
              transparent 180deg,
              #00ffff40 225deg,
              transparent 270deg,
              #ff00ff40 315deg,
              transparent 360deg
            )`,
          mixBlendMode: 'screen',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20, // Slower circuit rotation
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Hexagonal tech overlay for CTF feel */}
      <div
        className="absolute inset-3 rounded-full border opacity-60"
        style={{
          borderColor: '#00ffff60',
          borderStyle: 'dashed',
          borderWidth: '1px',
        }}
      />
      
      {/* Data pulse effect */}
      <motion.div
        className="absolute inset-1 rounded-full"
        style={{
          border: '2px solid #00ffff',
          opacity: 0,
        }}
        animate={{
          scale: [1, 1.3, 1.6],
          opacity: [0.8, 0.4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      
      {/* CTF Code fragments floating around */}
      {['01', '11', '00', '10'].map((code, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono"
          style={{
            color: '#00ffff80',
            left: '50%',
            top: '50%',
            fontFamily: 'monospace',
          }}
          animate={{
            x: [0, 40 * Math.cos((i * 90) * Math.PI / 180)],
            y: [0, 40 * Math.sin((i * 90) * Math.PI / 180)],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {code}
        </motion.div>
      ))}
      
      {/* CTF status indicator */}
      {orbLoaded && (
        <div
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
          style={{
            background: '#00ff00',
            boxShadow: '0 0 10px #00ff00',
          }}
        />
      )}
    </motion.div>
  );
}

export default function OrbModel3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={`w-full h-full ${className}`} />;
  }
  
  return (
    <div className={`${className}`}>
      <Suspense fallback={<div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 animate-pulse" />}>
        <CyberOrbCTF />
      </Suspense>
    </div>
  );
}
