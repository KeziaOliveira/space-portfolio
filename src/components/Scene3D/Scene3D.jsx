import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import './Scene3D.css';

// Camera Rig que reage à seção atual
function CameraRig({ currentSection }) {
  useFrame((state, delta) => {
    let targetCamY = 0;
    if (currentSection === 'sobre') targetCamY = -8;
    else if (currentSection === 'experiencia') targetCamY = -12;
    else if (currentSection === 'projetos') targetCamY = -16;
    else if (currentSection === 'contato') targetCamY = -24;

    const mouseX = (state.pointer.x * state.viewport.width) / 40;
    const mouseY = (state.pointer.y * state.viewport.height) / 40;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, delta * 2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY + mouseY, delta * 3);
  });
  return null;
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const checkMobile = () => { setIsMobile(window.innerWidth < 768); };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observerOptions = { threshold: 0.5 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id || 'hero');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id], .hero');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="scene3d-container" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#2563eb" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          
          <CameraRig currentSection={currentSection} />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={3000} 
            factor={4} 
            fade 
            speed={0.3} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
