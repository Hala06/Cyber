"use client";

"use client";

import dynamic from 'next/dynamic';

// Dynamically import the entire component to avoid SSR issues
export default dynamic(() => import('./ThreeJSOrbLoader').then(mod => mod.ThreeJSOrbCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-80 h-80 rounded-full bg-cyan-900/20 animate-pulse">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20" />
    </div>
  )
});
import { motion } from 'framer-motion';
import * as THREE from 'three';

// The actual 3D Orb Model Component
function OrbGLBModel() {
  const components = DynamicComponents;
  const { scene } = components.useGLTF('/orb.glb');
  const orbRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid sharing issues
  const clonedScene = scene.clone();

  // Apply holographic material properties
  clonedScene.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      if (child.material) {
        // Create holographic material
        const material = child.material as THREE.MeshStandardMaterial;
        material.transparent = true;
        material.opacity = 0.8;
        material.metalness = 0.9;
        material.roughness = 0.1;
        material.envMapIntensity = 2;
        
        // Add cyan/blue holographic tint
        material.color = new THREE.Color(0x00ffff);
        material.emissive = new THREE.Color(0x004466);
        material.emissiveIntensity = 0.3;
      }
    }
  });

  return (
    <primitive 
      ref={orbRef}
      object={clonedScene} 
      scale={[1.5, 1.5, 1.5]}
      position={[0, 0, 0]}
    />
  );
}

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
        <ThreeCanvas
          camera={{ 
            position: [0, 0, 5], 
            fov: 45,
            near: 0.1,
            far: 100
          }}
          dpr={[1, 2]}
          style={{ 
            background: 'transparent',
            width: '100%',
            height: '100%'
          }}
        >
          {/* Lighting setup for holographic effect */}
          <ambientLight intensity={0.4} color="#004466" />
          <pointLight 
            position={[10, 10, 10]} 
            intensity={1} 
            color="#00ffff"
            castShadow
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={0.5} 
            color="#0066ff"
          />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#00ffff"
            castShadow
          />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* The 3D Orb Model */}
          <Suspense fallback={null}>
            <OrbGLBModel />
          </Suspense>

          {/* Interactive controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </ReactThreeFiber.Canvas>
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

// Preload the GLTF model
useGLTF.preload('/orb.glb');

import { createRoot } from 'react-dom/client';

if (typeof window !== 'undefined') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<RealOrb3D />);
  }
}
