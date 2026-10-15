import React, { useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
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
  const materials = useLoader(MTLLoader, '/spaceship/Lo_poly_Spaceship_01_by_Liz_Reddington.mtl');
  const obj = useLoader(OBJLoader, '/spaceship/Lo_poly_Spaceship_01_by_Liz_Reddington.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Auto-normaliza o modelo para caber em ~0.7 unidades, independente do tamanho nativo
  const model = useMemo(() => {
    const cloned = obj.clone(true);
    cloned.scale.setScalar(1);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizedScale = 1.5 / maxDim;
    cloned.scale.setScalar(normalizedScale);
    const box2 = new THREE.Box3().setFromObject(cloned);
    const center = box2.getCenter(new THREE.Vector3());
    cloned.position.sub(center);

    // Boost de brilho: emissivo baseado na cor original de cada mesh
    cloned.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const applyEmissive = (mat) => {
        const m = mat.clone();
        m.emissive = m.color ? m.color.clone().multiplyScalar(0.5) : new THREE.Color(0.3, 0.3, 0.3);
        m.emissiveIntensity = 0.7;
        m.needsUpdate = true;
        return m;
      };
      child.material = Array.isArray(child.material)
        ? child.material.map(applyEmissive)
        : applyEmissive(child.material);
    });

    return cloned;
  }, [obj]);

  useEffect(() => {
    if (!isLaunching && meshRef.current) {
      meshRef.current.position.set(0, 0, 0);
    }
  }, [isLaunching]);

  // Rotação base definida pelo usuário no JSX
  const BASE_ROT = [4.5, 1.57, 4.57 + Math.PI];

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!isLaunching) {
        // Zoom suave no hover
        const targetScale = isHovered ? 1.22 : 1.0;
        const newScale = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08);
        meshRef.current.scale.setScalar(newScale);

        // Tilt diagonal no hover — pequena inclinação que sugere direção de voo
        const targetX = isHovered ? BASE_ROT[0] - 0.28 : BASE_ROT[0];
        const targetY = isHovered ? BASE_ROT[1] + 0.22 : BASE_ROT[1];
        const targetZ = BASE_ROT[2]; // Z fica fixo — sem giro
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.08);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.08);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetZ, 0.08);

        // Float suave
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      } else {
        meshRef.current.position.z += delta * 20;
        meshRef.current.position.x += delta * 15;
        meshRef.current.position.y += delta * 5;
        meshRef.current.scale.multiplyScalar(1.015);
      }
    }
  });

  return (
    <group ref={meshRef} rotation={[4.5, 1.57, 4.57 + Math.PI]}>
      <primitive object={model} />
      <group position={[0, -0.4, 0]}>
        <EngineFire active={isLaunching} />
      </group>
    </group>
  );
}

export default function SpaceshipButtonIcon({ isHovered, isLaunching }) {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0.5, 3], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={3} />
        <pointLight position={[3, 3, 4]} intensity={4} />
        <pointLight position={[-3, 1, 3]} intensity={2} color="#c8d8ff" />
        <pointLight position={[0, -2, 3]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model isHovered={isHovered} isLaunching={isLaunching} />
        </Suspense>
      </Canvas>
    </div>
  );
}


