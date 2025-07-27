"use client";

import { Suspense, useRef, useEffect, useState } from 'react';

// Dynamic import for Three.js to avoid SSR issues
const loadThreeJS = async () => {
  try {
    const [fiberModule, dreiModule] = await Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei')
    ]);
    // Access Canvas directly from the default export of fiber
    const fiber = fiberModule.default || fiberModule;
    const drei = dreiModule.default || dreiModule;
    
    return {
      Canvas: fiber.Canvas || fiberModule.Canvas,
      useFrame: fiber.useFrame || fiberModule.useFrame,
      useGLTF: drei.useGLTF || dreiModule.useGLTF
    };
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
  
  // Clone the scene to avoid sharing issues
  const clonedScene = scene.clone();
  
  // Apply holographic material properties
  clonedScene.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh && child.material) {
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
  });
  
  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += 0.01;
      orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      orbRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group ref={orbRef}>
      <primitive object={clonedScene} scale={[1.5, 1.5, 1.5]} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#00ffff" />
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#ff00ff" />
    </group>
  );
}

interface CanvasProps {
  camera?: {
    position: [number, number, number];
    fov: number;
  };
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface ThreeJSComponents {
  Canvas: React.ComponentType<CanvasProps>;
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
      camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
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
      
      {/* The 3D Orb Model */}
      <Suspense fallback={null}>
        <ActualOrbModel useFrame={useFrame} useGLTF={useGLTF} />
      </Suspense>
    </Canvas>
  );
}
