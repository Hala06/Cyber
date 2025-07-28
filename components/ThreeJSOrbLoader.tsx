"use client";

import { useEffect, useRef } from 'react';

// Simple GLB orb loader that will try to load your orb.glb file
export function ThreeJSOrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    console.log('🚀 Initializing Three.js orb loader...');

    let scene: unknown, camera: unknown, renderer: unknown, orb: unknown;
    let animationId: number;

    const initThreeJS = async () => {
      try {
        // Import Three.js
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

        // Setup scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.z = 8;

        // Setup renderer
        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current!, 
          alpha: true,
          antialias: true 
        });
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00aaff, 1, 100);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100);
        pointLight2.position.set(-10, -10, -10);
        scene.add(pointLight2);

        // Load your GLB file
        const loader = new GLTFLoader();
        loader.load(
          '/orb.glb',
          (gltf) => {
            orb = gltf.scene;
            orb.scale.set(3, 3, 3);
            
            // Enhance materials
            orb.traverse((child: any) => {
              if (child.isMesh && child.material) {
                child.material.transparent = true;
                child.material.opacity = 0.9;
                child.material.metalness = 0.8;
                child.material.roughness = 0.2;
                child.material.emissive = new THREE.Color(0x001133);
                child.material.emissiveIntensity = 0.3;
              }
            });

            scene.add(orb);
            console.log('✅ Your orb.glb loaded successfully!');
          },
          (progress) => {
            console.log('Loading progress:', progress);
          },
          (error) => {
            console.error('❌ Error loading orb.glb:', error);
            // Create fallback sphere
            const geometry = new THREE.SphereGeometry(2, 32, 32);
            const material = new THREE.MeshStandardMaterial({
              color: 0x00aaff,
              emissive: 0x001133,
              emissiveIntensity: 0.3,
              metalness: 0.8,
              roughness: 0.2,
              transparent: true,
              opacity: 0.9
            });
            orb = new THREE.Mesh(geometry, material);
            scene.add(orb);
          }
        );

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          
          if (orb) {
            orb.rotation.y += 0.01;
            orb.rotation.x += 0.005;
          }
          
          renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const size = Math.min(rect.width, rect.height, 300);
            renderer.setSize(size, size);
            camera.aspect = 1;
            camera.updateProjectionMatrix();
          }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
          console.error('Three.js initialization failed:', error);
          // Show CSS fallback that's definitely visible
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div style="
                width: 100%; 
                height: 100%; 
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 170, 255, 0.1);
                border-radius: 50%;
                border: 2px solid rgba(0, 170, 255, 0.3);
              ">
                <div style="
                  width: 160px; 
                  height: 160px; 
                  border-radius: 50%;
                  background: radial-gradient(circle at 30% 30%, rgba(0, 170, 255, 0.8), rgba(0, 100, 200, 0.6));
                  box-shadow: 0 0 30px rgba(0, 170, 255, 0.5);
                  animation: orbSpin 3s linear infinite;
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <div style="
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.4), transparent 60%);
                  "></div>
                  <div style="
                    color: rgba(0, 170, 255, 0.8);
                    font-size: 12px;
                    font-weight: bold;
                    text-align: center;
                    z-index: 10;
                  ">
                    GLB<br/>LOADING
                  </div>
                </div>
              </div>
              <style>
                @keyframes orbSpin { 
                  from { transform: rotateY(0deg) rotateX(0deg); } 
                  to { transform: rotateY(360deg) rotateX(360deg); } 
                }
              </style>
            `;
          }
      }
    };

    initThreeJS();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center cursor-pointer relative"
      style={{ minHeight: '200px' }}
    >
      {/* Immediate visible fallback */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-40 h-40 rounded-full border-2 border-cyan-400/30 bg-cyan-500/10"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(0, 170, 255, 0.3), rgba(0, 100, 200, 0.1))',
            boxShadow: '0 0 20px rgba(0, 170, 255, 0.2)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-cyan-400 text-sm font-bold">
            3D ORB
          </div>
        </div>
      </div>
      
      <canvas 
        ref={canvasRef}
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%',
          display: 'block',
          position: 'relative',
          zIndex: 10
        }}
      />
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
