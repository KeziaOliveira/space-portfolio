import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import './Scene3D.css';

// Componente do Planeta animado e interativo
function Planet({ position, color, emissive, label, targetId }) {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  const handlePlanetClick = (e) => {
    e.stopPropagation();
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useFrame((state, delta) => {
    if (planetRef.current) {
      // Rotação base individualizada com offset de position
      planetRef.current.rotation.y += delta * 0.15;
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + position[0]) * 0.1;

      // Escala no hover
      const targetScale = hovered ? 2.7 : 2.5;
      planetRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={planetRef} 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        onClick={handlePlanetClick}
      >
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={hovered ? "#8b5cf6" : color}
          emissive={hovered ? "#3b0764" : emissive}
          emissiveIntensity={hovered ? 2 : 1.5}
          roughness={0.4}
          metalness={0.6}
          wireframe={true}
          transparent={true}
          opacity={hovered ? 0.9 : 0.6}
        />
        <mesh>
          <sphereGeometry args={[0.98, 32, 32]} />
          <meshStandardMaterial 
            color="#020617" 
            roughness={0.9} 
            emissive={hovered ? "#1e1b4b" : "#000000"} 
            emissiveIntensity={0.5}
          />
        </mesh>
      </mesh>
      
      {/* Rótulo 3D */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color={hovered ? "#a78bfa" : "#94a3b8"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}

// Camera Rig que reage à seção atual
function CameraRig({ currentSection }) {
  useFrame((state, delta) => {
    // Definir posições alvo baseadas na seção atual
    let targetCamY = 0;
    if (currentSection === 'sobre') targetCamY = -8;
    else if (currentSection === 'projetos') targetCamY = -16;
    else if (currentSection === 'contato') targetCamY = -24;

    // Parallax suave com o mouse
    const mouseX = (state.pointer.x * state.viewport.width) / 30;
    const mouseY = (state.pointer.y * state.viewport.height) / 30;
    
    // Movimento fluido da câmera até o alvo
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, delta * 2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY + mouseY, delta * 3);
  });
  return null;
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    // 1. Controle Mobile
    const checkMobile = () => { setIsMobile(window.innerWidth < 768); };
    checkMobile();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    window.addEventListener('resize', handleResize);

    // 2. Intersection Observer para atualizar o currentSection no Scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Define como "ativa" quando 50% da seção está visível
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id || 'hero'); // Fallback para hero
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Elementos a observar
    const sections = document.querySelectorAll('section[id], .hero');
    sections.forEach((sec) => {
      // Se a hero não tiver ID explicitado, mapeamos via classe
      if (sec.classList.contains('hero')) sec.id = 'hero';
      observer.observe(sec);
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div className="scene3d-container" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
          
          <CameraRig currentSection={currentSection} />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={1500}
            factor={4}
            saturation={0} 
            fade 
            speed={0.5}
          />
          
          {/* Universo Navegável */}
          <Planet 
            position={[2.5, -8, -6]} 
            color="#2e1065" 
            emissive="#0f172a" 
            label="SOBRE" 
            targetId="sobre" 
          />
          <Planet 
            position={[-2.5, -16, -7]} 
            color="#083344" 
            emissive="#064e3b" 
            label="PROJETOS" 
            targetId="projetos" 
          />
          <Planet 
            position={[2, -24, -5]} 
            color="#450a0a" 
            emissive="#7f1d1d" 
            label="CONTATO" 
            targetId="contato" 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
