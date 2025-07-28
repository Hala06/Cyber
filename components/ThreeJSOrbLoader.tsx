




"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function OrbModel() {
  const { scene } = useGLTF("/orb.glb");
  return <primitive object={scene} scale={2.2} />;
}

export default function ThreeJSOrbLoader({ className = "", style = {} }) {
  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <Canvas camera={{ position: [0, 0, 6], fov: 38 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <OrbModel />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}




