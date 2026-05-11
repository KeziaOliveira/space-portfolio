import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Stars, Text } from '@react-three/drei';
import * as fflate from 'fflate';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';
import { about, projects, personal } from '../../data/content';
import './ExploreMode.css';

// --- Efeito de Fogo do Motor ---
function EngineFire({ active }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current && active) {
      // flicker constante no GPU/Material
      const t = state.clock.elapsedTime;
      const flicker = Math.sin(t * 30) * 0.1;
      meshRef.current.scale.set(1 + flicker, 1.5 + flicker, 1 + flicker);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.8, 0]} rotation={[0, 0, 0]} visible={active}>
      <coneGeometry args={[0.25, 1.2, 12]} />
      <meshStandardMaterial 
        color="#fb923c" 
        emissive="#ff4400" 
        emissiveIntensity={6} 
        transparent 
        opacity={0.7}
        depthWrite={false}
      />
    </mesh>
  );
}

// --- Modelo OBJ da Nave (SpaceShuttle) com textura ---
function SpaceshipModel({ isMoving }) {
  const obj = useLoader(OBJLoader, '/spaceship/SpaceShuttle.obj');
  const texture = useLoader(THREE.TextureLoader, '/spaceship/SpaceShuttle_BaseColor.png');

  const model = useMemo(() => {
    const cloned = obj.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.3,
          roughness: 0.6,
        });
      }
    });
    return cloned;
  }, [obj, texture]);

  return (
    <group rotation={[4.8, 0, 0]}>
      <primitive
        object={model}
        scale={[0.05, 0.05, 0.05]}
      />
      {/* Dois jatos laterais mais próximos e curtos */}
      <group position={[0.25, -1, -0.3]}>
        <EngineFire active={isMoving} />
      </group>
      <group position={[-0.25, -1, -0.3]}>
        <EngineFire active={isMoving} />
      </group>
    </group>
  );
}

// --- Nave com lógica de voo ---
function Spaceship({ target, onArrive, isMoving }) {
  const shipRef = useRef();
  const { camera } = useThree();
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    if (target) setHasArrived(false);
  }, [target]);

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    if (target && !hasArrived) {
      const dist = shipRef.current.position.distanceTo(target);

      if (dist > 3.5) {
        const targetRotation = new THREE.Matrix4().lookAt(
          shipRef.current.position, target, new THREE.Vector3(0, 1, 0)
        );
        const quaternion = new THREE.Quaternion().setFromRotationMatrix(targetRotation);
        shipRef.current.quaternion.slerp(quaternion, delta * 5); // Curva mais rápida
        shipRef.current.translateZ(-delta * 13); // Velocidade aumentada de 8 para 20
      } else {
        setHasArrived(true);
        onArrive();
      }
    } else if (!target) {
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    // Câmera terceira pessoa - Ajuste de enquadramento via alvo (lookAt)
    const camDist = onArrive && hasArrived ? 45 : 10;
    const cameraOffset = new THREE.Vector3(0, 2, camDist);
    cameraOffset.applyQuaternion(shipRef.current.quaternion);
    cameraOffset.add(shipRef.current.position);
    camera.position.lerp(cameraOffset, delta * 3);

    // Deslocamos o alvo para a esquerda para o planeta ir para a direita
    const lookOffset = onArrive && hasArrived ? new THREE.Vector3(-18, 0, 0) : new THREE.Vector3(0, 0, 0);
    lookOffset.applyQuaternion(shipRef.current.quaternion);
    const targetPoint = shipRef.current.position.clone().add(lookOffset);
    
    camera.lookAt(targetPoint);
  });

  return (
    <group ref={shipRef} position={[0, 0, 0]}>
      <SpaceshipModel isMoving={isMoving && !hasArrived} />
    </group>
  );
}

// --- Modelo FBX do Planeta ---
function PlanetModel({ url, color }) {
  const fbx = useLoader(FBXLoader, url);
  
  const model = useMemo(() => {
    const cloned = fbx.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        // Se não tiver material ou for o padrão, aplica um básico com a cor do planeta
        if (!child.material || child.material.name === "Default-Material") {
          child.material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.7,
            metalness: 0.2
          });
        }
      }
    });
    return cloned;
  }, [fbx, color]);

  return <primitive object={model} scale={[0.5, 0.5, 0.5]} />;
}

// --- Planeta do Modo Exploração ---
function ExplorePlanet({ position, color, label, id, onClick, isActive }) {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame((state, delta) => {
    if (planetRef.current) {
      // Rotação contínua no próprio eixo
      planetRef.current.rotation.y += delta * 0.4;
      
      // Escala aumenta massivamente se for o planeta ativo (modal aberto)
      const targetScale = isActive ? 18.0 : (hovered ? 1.1 : 1.0);
      planetRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2);
    }
  });

  // Mapeamento de modelos e texturas
  const modelUrl = id === 'sobre' ? '/planets/planet_2.fbx' : 
                   id === 'projetos' ? '/planets/planet_1.fbx' : null;
  
  const textureUrl = id === 'contato' ? '/planets/planet_3_color.jpg' : null;
  const planetTexture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) : null;

  return (
    <group position={position}>
      <group
        ref={planetRef}
        onPointerOver={(e) => { 
          if (isActive) return;
          e.stopPropagation(); 
          setHovered(true); 
        }}
        onPointerOut={(e) => { 
          if (isActive) return;
          e.stopPropagation(); 
          setHovered(false); 
        }}
        onClick={(e) => { 
          if (isActive) return;
          e.stopPropagation(); 
          onClick(new THREE.Vector3(...position), id); 
        }}
      >
        {modelUrl ? (
          <Suspense fallback={<sphereGeometry args={[1.5, 16, 16]} />}>
            <PlanetModel url={modelUrl} color={color} />
          </Suspense>
        ) : (
          <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
              map={planetTexture}
              color={planetTexture ? '#ffffff' : color}
              emissive={planetTexture ? '#000000' : color}
              emissiveIntensity={isActive ? 0.1 : (hovered ? 0.6 : 0.2)}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        )}
      </group>

    </group>
  );
}

// --- Conteúdos 2D Overlays ---
function AboutPanel() {
  return (
    <>
      <span className="explore__panel-title">Sobre Mim</span>
      <h2>Quem é {personal.name}</h2>
      <div className="explore__panel-content">
        {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </>
  );
}

function ProjectsPanel() {
  return (
    <>
      <span className="explore__panel-title">Portfólio</span>
      <h2>Projetos Selecionados</h2>
      <div className="explore__panel-content">
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong> — {p.description.substring(0, 80)}...{' '}
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer">Ver ao vivo</a>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ContactPanel() {
  return (
    <>
      <span className="explore__panel-title">Comunicação</span>
      <h2>Fale Comigo</h2>
      <div className="explore__panel-content">
        <p>Gostou do portfólio? Vamos conversar sobre como posso ajudar seu time.</p>
        <p>📍 {personal.location}</p>
        <p>✉️ <a href={`mailto:${personal.email}`}>{personal.email}</a></p>
        <p>🔗 <a href={personal.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a></p>
        <p>💻 <a href={personal.githubUrl} target="_blank" rel="noreferrer">GitHub</a></p>
      </div>
    </>
  );
}

// --- Componente Principal ---
export default function ExploreMode({ onClose }) {
  const [targetPos, setTargetPos] = useState(null);
  const [activePanelId, setActivePanelId] = useState(null);
  const [flyingToId, setFlyingToId] = useState(null);

  // Definição das rotas do universo
  const planets = [
    { id: 'sobre', label: 'SOBRE', position: [-15, 2, -20], color: '#a78bfa' },
    { id: 'projetos', label: 'PROJETOS', position: [10, -5, -40], color: '#22d3ee' },
    { id: 'contato', label: 'CONTATO', position: [-5, 8, -60], color: '#fbbf24' }
  ];

  // Índices para navegação
  const currentIndex = flyingToId ? planets.findIndex(p => p.id === flyingToId) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < planets.length - 1;

  const startFlight = (pos, id) => {
    setActivePanelId(null);
    setTargetPos(new THREE.Vector3(...pos));
    setFlyingToId(id);
  };

  const handlePlanetClick = (pos, id) => {
    startFlight([pos.x, pos.y, pos.z], id);
  };

  const onFlightArrive = () => {
    setActivePanelId(flyingToId);
  };

  // Navegação por setas
  const goNext = () => {
    if (hasNext) {
      const nextPlanet = planets[currentIndex + 1];
      startFlight(nextPlanet.position, nextPlanet.id);
    } else {
      // Navegação circular: volta ao primeiro
      startFlight(planets[0].position, planets[0].id);
    }
  };

  const goPrev = () => {
    if (hasPrev) {
      const prevPlanet = planets[currentIndex - 1];
      startFlight(prevPlanet.position, prevPlanet.id);
    } else {
      // Navegação circular: vai ao último
      const lastPlanet = planets[planets.length - 1];
      startFlight(lastPlanet.position, lastPlanet.id);
    }
  };

  const closePanelAndOverview = () => {
    setActivePanelId(null);
    setFlyingToId(null);
    setTargetPos(new THREE.Vector3(0, 0, 0)); // Volta para o overview central
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActivePanelId(null);
        goNext();
      }
      if (e.key === 'ArrowLeft') {
        setActivePanelId(null);
        goPrev();
      }
      if (e.key === 'Escape') {
        if (activePanelId) closePanelAndOverview();
        else onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activePanelId]);

  return (
    <div className="explore-mode">
      <div className="explore__header">
        <button className="explore__back-btn" onClick={onClose}>
          ⬅ Voltar ao Portfólio
        </button>
        <div className="explore__hint">Use as setas ou clique num planeta para viajar</div>
      </div>

      {/* Setas de Navegação */}
      <button
        className="explore__nav-btn explore__nav-btn--prev"
        onClick={goPrev}
        disabled={!hasPrev}
        aria-label="Planeta Anterior"
      >
        ←
      </button>

      <button
        className="explore__nav-btn explore__nav-btn--next"
        onClick={goNext}
        disabled={!hasNext && currentIndex !== -1}
        aria-label="Próximo Planeta"
      >
        →
      </button>

      {/* Indicador de Progresso (Rodapé) */}
      <div className="explore__progress">
        {planets.map((p, index) => (
          <React.Fragment key={p.id}>
            <span
              className={`explore__progress-item ${flyingToId === p.id ? 'is-active' : ''}`}
              onClick={() => startFlight(p.position, p.id)}
            >
              {p.label}
            </span>
            {index < planets.length - 1 && (
              <span className="explore__progress-separator"></span>
            )}
          </React.Fragment>
        ))}
      </div>

      <Canvas camera={{ position: [0, 2, 6], fov: 60 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />

          <Stars radius={200} depth={100} count={3000} factor={6} saturation={0} fade speed={1} />

          {/* Nave Espacial no centro (0,0,0) inicialmente */}
          <group visible={!activePanelId}>
            <Spaceship target={targetPos} onArrive={onFlightArrive} isMoving={!!flyingToId} />
          </group>

          {/* Planetas gerados a partir do array de rotas */}
          {planets.map((p) => {
            // Se algum painel estiver ativo, só mostramos o planeta que é alvo do voo
            const isVisible = !activePanelId || flyingToId === p.id;
            if (!isVisible) return null;

            return (
              <ExplorePlanet
                key={p.id}
                position={p.position}
                color={p.color}
                label={p.label}
                id={p.id}
                onClick={handlePlanetClick}
                isActive={activePanelId === p.id}
              />
            );
          })}
        </Suspense>
      </Canvas>

      {/* Renderização do Painel Overlay */}
      {activePanelId && (
        <div className="explore__panel-overlay">
          <div className="explore__panel">
            <button className="explore__panel-close" onClick={closePanelAndOverview}>×</button>
            {activePanelId === 'sobre' && <AboutPanel />}
            {activePanelId === 'projetos' && <ProjectsPanel />}
            {activePanelId === 'contato' && <ContactPanel />}
          </div>
        </div>
      )}
    </div>
  );
}
