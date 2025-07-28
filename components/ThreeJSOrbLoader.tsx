"use client";

import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeJSOrbLoaderProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ThreeJSOrbLoader({ className = "", style = {} }: ThreeJSOrbLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Store reference to the current container for cleanup
    const container = containerRef.current;
    
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
    camera.position.set(0, 0, 6);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    // Add lights
    // Strong blue ambient light
    const ambientLight = new THREE.AmbientLight(0x99e6ff, 1.6);
    scene.add(ambientLight);
    
    // Strong white light from the front/top
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.2);
    directionalLight.position.set(0, 4, 6);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Strong blue highlight from the front/top
    const bluePointLight = new THREE.PointLight(0x66ccff, 3.5, 25, 2);
    bluePointLight.position.set(0, 2, 6);
    scene.add(bluePointLight);
    
    // Blue fill from below
    const blueFillLight = new THREE.PointLight(0x33bbff, 1.7, 18, 2);
    blueFillLight.position.set(0, -3, 4);
    scene.add(blueFillLight);
    
    // Subtle purple accent
    const purpleLight = new THREE.DirectionalLight(0x8b5cf6, 1.0);
    purpleLight.position.set(-4, 2, 2);
    scene.add(purpleLight);
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    
    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('/orb.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(2.2, 2.2, 2.2);
      scene.add(model);
    });
    
    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div ref={containerRef} className={`w-full h-full ${className}`} style={style}></div>
  );
}
