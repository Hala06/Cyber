"use client";

import { Suspense, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Dynamic import for Three.js to avoid SSR issues
const loadThreeJS = async () => {
  try {
    const [fiber, drei] = await Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei')
    ]);
    const { Canvas } = fiber;
    const { useGLTF } = drei;
    const useFrame = fiber.useFrame;
    return { Canvas, useFrame, useGLTF };
  } catch (error) {
    console.warn('Failed to load Three.js components:', error);
    return null;
  }
};

// Types for Three.js components
import * as THREE from 'three';

interface ThreeComponents {
  useFrame: (callback: (state: { clock: { elapsedTime: number } }) => void) => void;
  useGLTF: (path: string) => { scene: THREE.Group };
}

// The actual 3D orb model loader
function ActualOrbModel({ useFrame, useGLTF }: ThreeComponents) {
  const orbRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/orb.glb');
  
  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += 0.01;
      orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      orbRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group ref={orbRef}>
      <primitive object={scene.clone()} scale={[1.5, 1.5, 1.5]} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#00ffff" />
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#ff00ff" />
    </group>
  );
}

interface ThreeJSComponents {
  Canvas: React.ComponentType<any>;
  useFrame: ThreeComponents['useFrame'];
  useGLTF: ThreeComponents['useGLTF'];
}

// Three.js Canvas wrapper
export function ThreeJSOrbCanvas() {
  const [threeComponents, setThreeComponents] = useState<ThreeJSComponents | null>(null);
  const [loadError, setLoadError] = useState(false);
  
  useEffect(() => {
    loadThreeJS().then((components) => {
      if (components) {
        setThreeComponents(components as ThreeJSComponents);
      } else {
        setLoadError(true);
      }
    });
  }, []);
  
  if (loadError || !threeComponents) {
    return <div>Loading...</div>; // Simple loading fallback
  }
  
  const { Canvas, useFrame, useGLTF } = threeComponents;
  
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <ActualOrbModel useFrame={useFrame} useGLTF={useGLTF} />
      </Suspense>
    </Canvas>
  );
}
