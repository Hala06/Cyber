'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus, RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

function CyberGrid({ theme }: { theme: 'dark' | 'light' }) {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.002;
      gridRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.5;
    }
  });

  const gridColor = theme === 'dark' ? '#00ffff' : '#0066ff';
  const lines = useMemo(() => {
    const group = [];
    const size = 40;
    const divisions = 20;
    const step = size / divisions;
    
    for (let i = 0; i <= divisions; i++) {
      const pos = -size/2 + i * step;
      // Horizontal lines
      group.push(
        <mesh key={`h-${i}`} position={[0, 0, pos]}>
          <boxGeometry args={[size, 0.02, 0.02]} />
          <meshBasicMaterial color={gridColor} transparent opacity={0.3} />
        </mesh>
      );
      // Vertical lines  
      group.push(
        <mesh key={`v-${i}`} position={[pos, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, size]} />
          <meshBasicMaterial color={gridColor} transparent opacity={0.3} />
        </mesh>
      );
    }
    return group;
  }, [gridColor]);

  return (
    <group ref={gridRef} position={[0, -15, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {lines}
    </group>
  );
}

function DataStream({ position, theme }: { position: [number, number, number], theme: 'dark' | 'light' }) {
  const streamRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      offset: i * 0.5,
      speed: 0.02 + Math.random() * 0.03
    }));
  }, []);

  useFrame(() => {
    if (streamRef.current) {
      streamRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        child.position.y -= particle.speed;
        if (child.position.y < -10) {
          child.position.y = 10;
        }
        
        // Add some glow effect
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = 0.5 + Math.sin(Date.now() * 0.005 + particle.offset) * 0.3;
      });
    }
  });

  const streamColor = theme === 'dark' ? '#00ff88' : '#00aa55';
  
  return (
    <group ref={streamRef} position={position}>
      {particles.map((particle) => (
        <mesh key={particle.id} position={[0, 10 - particle.offset, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={streamColor} transparent />
        </mesh>
      ))}
    </group>
  );
}

function HolographicRings({ theme }: { theme: 'dark' | 'light' }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.01;
      ring1Ref.current.rotation.z += 0.005;
      ring1Ref.current.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.1);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += 0.008;
      ring2Ref.current.rotation.x += 0.003;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += 0.006;
      ring3Ref.current.position.y = Math.sin(Date.now() * 0.001) * 2;
    }
  });

  const colors = theme === 'dark' 
    ? ['#00ffff', '#ff00ff', '#00ff00']
    : ['#0066ff', '#6600ff', '#00cc66'];

  return (
    <>
      <Torus ref={ring1Ref} position={[8, 2, -8]} args={[3, 0.05, 16, 32]} scale={1.5}>
        <meshBasicMaterial color={colors[0]} transparent opacity={0.6} />
      </Torus>
      <Torus ref={ring2Ref} position={[-6, -3, -10]} args={[4, 0.08, 16, 32]} scale={1}>
        <meshBasicMaterial color={colors[1]} transparent opacity={0.4} />
      </Torus>
      <Torus ref={ring3Ref} position={[2, 6, -12]} args={[2.5, 0.06, 16, 32]} scale={0.8}>
        <meshBasicMaterial color={colors[2]} transparent opacity={0.5} />
      </Torus>
    </>
  );
}

function CyberCube({ position, theme }: { position: [number, number, number], theme: 'dark' | 'light' }) {
  const cubeRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.005;
      cubeRef.current.rotation.y += 0.007;
      cubeRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.5;
    }
  });

  const edgeColor = theme === 'dark' ? '#00ffff' : '#0066ff';
  
  return (
    <group position={position}>
      <RoundedBox ref={cubeRef} args={[1, 1, 1]} radius={0.1}>
        <meshBasicMaterial transparent opacity={0.1} color={edgeColor} />
      </RoundedBox>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color={edgeColor} />
      </lineSegments>
    </group>
  );
}

function ParticleField({ theme }: { theme: 'dark' | 'light' }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0002;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particlesCount = 1500;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);
    
    const colorPalette = theme === 'dark' 
      ? [
          [0, 1, 1],     // Cyan
          [1, 0, 1],     // Magenta
          [0, 1, 0.5],   // Green-cyan
          [0.5, 0, 1],   // Purple
        ]
      : [
          [0, 0.4, 1],   // Blue
          [0.4, 0, 1],   // Purple
          [0, 0.8, 0.4], // Green
          [1, 0.4, 0],   // Orange
        ];
    
    for (let i = 0; i < particlesCount; i++) {
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const selectedColor = colorPalette[colorIndex];
      col[i * 3] = selectedColor[0];
      col[i * 3 + 1] = selectedColor[1];
      col[i * 3 + 2] = selectedColor[2];
    }
    
    return { positions: pos, colors: col };
  }, [theme]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        vertexColors
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Background3D() {
  const { theme } = useTheme();
  
  const lightColors = theme === 'dark' 
    ? { primary: '#00ffff', secondary: '#ff00ff', accent: '#00ff88' }
    : { primary: '#0066ff', secondary: '#6600ff', accent: '#00aa55' };

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Dynamic lighting based on theme */}
        <ambientLight intensity={theme === 'dark' ? 0.2 : 0.4} />
        <pointLight position={[10, 10, 10]} color={lightColors.primary} intensity={theme === 'dark' ? 1.5 : 1} />
        <pointLight position={[-10, -10, -10]} color={lightColors.secondary} intensity={theme === 'dark' ? 1 : 0.8} />
        <pointLight position={[0, 15, 5]} color={lightColors.accent} intensity={theme === 'dark' ? 0.8 : 0.6} />
        
        {/* Futuristic elements */}
        <ParticleField theme={theme} />
        <CyberGrid theme={theme} />
        <HolographicRings theme={theme} />
        
        {/* Data streams */}
        <DataStream position={[5, 0, -5]} theme={theme} />
        <DataStream position={[-8, 0, -3]} theme={theme} />
        <DataStream position={[2, 0, -10]} theme={theme} />
        
        {/* Cyber cubes */}
        <CyberCube position={[-12, 4, -8]} theme={theme} />
        <CyberCube position={[10, -2, -6]} theme={theme} />
        <CyberCube position={[0, 8, -15]} theme={theme} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.02}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}
