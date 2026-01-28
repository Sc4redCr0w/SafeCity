'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create material with blue glow
    const material = new THREE.MeshPhongMaterial({
      color: 0x0ea5e9, // Cyan-500
      emissive: 0x0284c7, // Cyan-600
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add wireframe overlay for continent effect
    const wireframeGeometry = new THREE.SphereGeometry(2.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan-400
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add point lights for glow effect
    const pointLight1 = new THREE.PointLight(0x0ea5e9, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1.5, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x0284c7, 0.5);
    scene.add(ambientLight);

    // Add particles around globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate globe - increased speed for more visible rotation
      globe.rotation.y += 0.004;
      wireframe.rotation.y += 0.004;
      
      // Rotate particles
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full"
      style={{ 
        filter: 'blur(0px)',
        opacity: 0.8,
      }}
    />
  );
}
