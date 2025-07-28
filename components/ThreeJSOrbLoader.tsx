"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function OrbModel() {
  const { scene } = useGLTF("/orb.glb");
  return <primitive object={scene} scale={2.2} />;
}

interface ThreeJSOrbLoaderProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ThreeJSOrbLoader({ className = "", style = {} }: ThreeJSOrbLoaderProps) {
  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <Canvas camera={{ position: [0, 0, 6], fov: 38 }} shadows>
        {/* Strong blue ambient and point lights for glowing blue orb */}
        <ambientLight intensity={1.6} color={0x99e6ff} />
        {/* Strong white light from the front/top */}
        <directionalLight position={[0, 4, 6]} intensity={3.2} color={0xffffff} castShadow />
        {/* Strong blue highlight from the front/top */}
        <pointLight position={[0, 2, 6]} intensity={3.5} color={0x66ccff} distance={25} decay={2} />
        {/* Blue fill from below */}
        <pointLight position={[0, -3, 4]} intensity={1.7} color={0x33bbff} distance={18} decay={2} />
        {/* Subtle purple accent */}
        <directionalLight position={[-4, 2, 2]} intensity={1.0} color={0x8b5cf6} />
        <Suspense fallback={null}>
          <OrbModel />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Required for GLTF loading
useGLTF.preload("/orb.glb");
