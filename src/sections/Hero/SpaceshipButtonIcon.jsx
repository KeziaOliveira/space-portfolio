import React, { useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

function EngineFire({ active }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current && active) {
      const t = state.clock.elapsedTime;
      const flicker = Math.sin(t * 30) * 0.1;
      meshRef.current.scale.set(1 + flicker, 1.5 + flicker, 1 + flicker);
    }
  });
  return (
    <mesh ref={meshRef} position={[0, -0.8, 0]} visible={active}>
      <coneGeometry args={[0.2, 0.8, 12]} />
      <meshStandardMaterial 
        color="#fb923c" 
        emissive="#ff4400" 
        emissiveIntensity={8} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

function Model({ isHovered, isLaunching }) {
  const meshRef = useRef();
  const obj = useLoader(OBJLoader, '/spaceship/SpaceShuttle.obj');
  const texture = useLoader(THREE.TextureLoader, '/spaceship/SpaceShuttle_BaseColor.png');

  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.5,
        roughness: 0.5,
      });
    }
  });

  useEffect(() => {
    if (!isLaunching && meshRef.current) {
      meshRef.current.position.set(0, 0, 0);
      meshRef.current.scale.set(0.18, 0.18, 0.18);
    }
  }, [isLaunching]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!isLaunching) {
        const targetRotationZ = isHovered ? Math.PI - Math.PI / 1.5 : Math.PI - Math.PI / 3;
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotationZ, 0.05);
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else {
        meshRef.current.position.z += delta * 20;
        meshRef.current.position.x += delta * 15;
        meshRef.current.position.y += delta * 5;
        meshRef.current.scale.multiplyScalar(1.015);
      }
    }
  });

  return (
    <group ref={meshRef} rotation={[Math.PI / 2, Math.PI, Math.PI - Math.PI / 3]}>
      <primitive 
        object={obj} 
        scale={[0.18, 0.18, 0.18]} 
      />
      {/* Motores acesos no lançamento */}
      <group position={[0.75, -1.8, -0.9]}>
        <EngineFire active={isLaunching} />
      </group>
      <group position={[-0.75, -1.8, -0.9]}>
        <EngineFire active={isLaunching} />
      </group>
    </group>
  );
}

export default function SpaceshipButtonIcon({ isHovered, isLaunching }) {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0.5, 3], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={null}>
          <Model isHovered={isHovered} isLaunching={isLaunching} />
        </Suspense>
      </Canvas>
    </div>
  );
}


