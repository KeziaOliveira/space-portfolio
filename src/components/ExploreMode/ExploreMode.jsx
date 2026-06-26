import React, { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as fflate from 'fflate';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';
import { useLanguage } from '../../context/LanguageContext';
import { social } from '../../data/content';
import ReactIcon   from '../../assets/icons/tech/react-brands-solid-full.svg';
import TSIcon      from '../../assets/icons/tech/typescript-brands-solid-full.svg';
import JSIcon      from '../../assets/icons/tech/square-js-brands-solid-full.svg';
import AngularIcon from '../../assets/icons/tech/angular-brands-solid-full.svg';
import NodeIcon    from '../../assets/icons/tech/node-brands-solid-full.svg';
import PythonIcon  from '../../assets/icons/tech/python-brands-solid-full.svg';
import CSSIcon     from '../../assets/icons/tech/css3-alt-brands-solid-full.svg';
import FigmaIcon   from '../../assets/icons/tech/square-figma-brands-solid-full.svg';

const TECH_STACK = [
  { name: 'React',      icon: ReactIcon },
  { name: 'TypeScript', icon: TSIcon },
  { name: 'JavaScript', icon: JSIcon },
  { name: 'Angular',    icon: AngularIcon },
  { name: 'Node.js',    icon: NodeIcon },
  { name: 'Python',     icon: PythonIcon },
  { name: 'CSS / SCSS', icon: CSSIcon },
  { name: 'Figma',      icon: FigmaIcon },
];
import './ExploreMode.css';
import EmailIcon    from '../../assets/icons-contact/envelope-solid-full (2).svg';
import GithubIcon   from '../../assets/icons-contact/square-github-brands-solid-full.svg';
import LinkedinIcon from '../../assets/icons-contact/square-linkedin-brands-solid-full (1).svg';

import glensoVideo    from '../../assets/videos/projects_videos/Glenso_video.mp4';
import scoreVideo     from '../../assets/videos/projects_videos/Scoreboard_video.mp4';
import goldVideo      from '../../assets/videos/projects_videos/Gold_video.mp4';
import geeoVideo      from '../../assets/videos/projects_videos/Geeo_video.mp4';
import sfeVideo       from '../../assets/videos/experience_videos/SFE_video.mp4';
import escolaVideo    from '../../assets/videos/experience_videos/Escolaweb_video.mp4';
import ecommerceVideo from '../../assets/videos/experience_videos/ecommerce-recording.mp4';

const PROJECT_VIDEOS    = [glensoVideo, scoreVideo, goldVideo, geeoVideo];
const EXPERIENCE_VIDEOS = [sfeVideo, escolaVideo, ecommerceVideo];

// ─── Sistema Solar ────────────────────────────────────────────────────────────

const SUN_POS = new THREE.Vector3(0, 0, -50);

const CONTENT_PLANETS = [
  { id: 'sobre',       label: 'SOBRE',       orbitR:  84, speed: 0.085, angle0: 1.57, yOff:  2, color: '#3b82f6', modelUrl: '/planets/planet_2.fbx',             size: 11 },
  { id: 'experiencia', label: 'EXPERIÊNCIA', orbitR: 136, speed: 0.065, angle0: 4.20, yOff: -3, color: '#a78bfa', modelUrl: '/planets/planet_1.fbx',             size: 10 },
  { id: 'projetos',    label: 'PROJETOS',    orbitR: 192, speed: 0.045, angle0: 0.60, yOff: -4, color: '#22d3ee', objUrl:   '/planets/Planet_5/planet_5.obj',    size: 13 },
  { id: 'contato',     label: 'CONTATO',     orbitR: 256, speed: 0.022, angle0: 0.30, yOff:  6, color: '#fbbf24', objUrl:   '/planets/planet_4/planet_4.obj',    size: 11 },
];

const DECO_PLANETS = [
  { id: 'deco1', orbitR:  60, speed: 0.32,  angle0: 3.50, yOff: -3, color: '#f97316', size: 0.7 },
  { id: 'deco2', orbitR: 112, speed: 0.08,  angle0: 5.00, yOff:  3, color: '#7c3aed', objUrl: '/planets/Planet_6/planet_6.obj', size: 2.5 },
  { id: 'deco3', orbitR: 224, speed: 0.032, angle0: 2.00, yOff: -5, color: '#64748b', size: 2.0 },
];

function getOrbitalPos(cfg, t) {
  const a = cfg.angle0 + t * cfg.speed;
  return new THREE.Vector3(
    SUN_POS.x + cfg.orbitR * Math.cos(a),
    SUN_POS.y + cfg.yOff,
    SUN_POS.z + cfg.orbitR * Math.sin(a)
  );
}

// ─── Sol ──────────────────────────────────────────────────────────────────────

function Sun() {
  const coreRef = useRef();
  useFrame(() => { if (coreRef.current) coreRef.current.rotation.y += 0.001; });
  return (
    <group position={SUN_POS.toArray()}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[32, 32, 32]} />
        <meshStandardMaterial color="#fff0a0" emissive="#ff8800" emissiveIntensity={2.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[48, 32, 32]} />
        <meshStandardMaterial color="#ff6a00" emissive="#ff3a00" emissiveIntensity={1.2}
          transparent opacity={0.08} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <pointLight intensity={120} distance={800} decay={1.5} color="#fff5d0" />
    </group>
  );
}

// ─── Fogo do Motor ────────────────────────────────────────────────────────────

function EngineFire({ active }) {
  const groupRef = useRef();
  const matsRef  = useRef([]);

  useEffect(() => {
    let live = true;
    new MTLLoader().load('/spaceship/Fire/fire.mtl', (mtl) => {
      if (!live) return;
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('/spaceship/Fire/fire.obj', (root) => {
        if (!live || !groupRef.current) return;
        const box  = new THREE.Box3().setFromObject(root);
        const dims = box.getSize(new THREE.Vector3());
        const s    = 0.55 / Math.max(dims.x, dims.y, dims.z);
        root.scale.setScalar(s);
        const box2   = new THREE.Box3().setFromObject(root);
        const center = box2.getCenter(new THREE.Vector3());
        // center X/Z, base of flame sits at origin so it extends out from nozzle
        root.position.set(-center.x, -box2.min.y, -center.z);

        const fireMats = [];
        root.traverse((c) => {
          if (!c.isMesh) return;
          const mat = new THREE.MeshStandardMaterial({
            color:             new THREE.Color(0.2, 0.6, 1.0),
            emissive:          new THREE.Color(0.1, 0.4, 1.0),
            emissiveIntensity: 4,
            transparent:       true,
            opacity:           0.92,
            depthWrite:        false,
            side:              THREE.DoubleSide,
          });
          c.material = mat;
          fireMats.push(mat);
        });
        matsRef.current = fireMats;
        groupRef.current.clear();
        groupRef.current.add(root);
      });
    });
    return () => { live = false; };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.visible = active;
    if (!active) return;
    const t  = state.clock.elapsedTime;
    const fx = Math.sin(t * 27)        * 0.09;
    const fy = Math.sin(t * 18 + 1.1)  * 0.12;
    groupRef.current.scale.set(1 + fx, 1 + fy, 1 + fx);
    const opacity = 0.72 + Math.sin(t * 23 + 0.7) * 0.22;
    const emissive = 3.5 + Math.sin(t * 19) * 1.8;
    matsRef.current.forEach((m) => {
      m.opacity           = opacity;
      m.emissiveIntensity = emissive;
    });
  });

  return <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} visible={active} />;
}

// ─── Modelo da Nave ───────────────────────────────────────────────────────────

function SpaceshipModel({ isMoving }) {
  const materials = useLoader(MTLLoader, '/spaceship/Lo_poly_Spaceship_01_by_Liz_Reddington.mtl');
  const obj = useLoader(OBJLoader, '/spaceship/Lo_poly_Spaceship_01_by_Liz_Reddington.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const model = useMemo(() => {
    const cloned = obj.clone(true);
    const box  = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    cloned.scale.setScalar(2.5 / Math.max(size.x, size.y, size.z));
    const box2 = new THREE.Box3().setFromObject(cloned);
    cloned.position.sub(box2.getCenter(new THREE.Vector3()));

    const applyEmissive = (mat) => {
      const m = mat.clone();
      m.emissive = m.color ? m.color.clone().multiplyScalar(0.5) : new THREE.Color(0.3, 0.3, 0.3);
      m.emissiveIntensity = 0.7;
      m.needsUpdate = true;
      return m;
    };
    cloned.traverse((c) => {
      if (!c.isMesh || !c.material) return;
      c.material = Array.isArray(c.material) ? c.material.map(applyEmissive) : applyEmissive(c.material);
    });
    return cloned;
  }, [obj]);

  return (
    <group rotation={[0, Math.PI, 0]}>
      <primitive object={model} />
      <group position={[-0.36, -0.08, -1.15]}><EngineFire active={isMoving} /></group>
      <group position={[ 0.36, -0.08, -1.15]}><EngineFire active={isMoving} /></group>
    </group>
  );
}

// ─── Nave com lógica de voo + órbita ─────────────────────────────────────────

const SHIP_ORBIT_R      = 17;
const SHIP_ORBIT_SPEED  = 0.6;
const SHIP_ORBIT_Y_OFF  = 5;
const UP_VEC           = new THREE.Vector3(0, 1, 0);

function Spaceship({ flyingToId, planetPosRefs, onArrive, isMoving }) {
  const shipRef    = useRef();
  const { camera } = useThree();

  const [orbitMode,  setOrbitMode]  = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [isIntro,    setIsIntro]    = useState(true);

  const orbitAngleRef    = useRef(0);
  const prevIdRef        = useRef(null);
  const arrivedFiredRef  = useRef(false);
  const orbitCamReadyRef = useRef(false);
  // Coordenadas polares da nave em relação ao sol (para voo orbital)
  const arcAngleRef      = useRef(0);
  const arcRadiusRef     = useRef(100);

  useFrame((state, delta) => {
    if (!shipRef.current) return;
    const dt = Math.min(delta, 0.05);

    // Detecta novo destino — inicializa coordenadas polares a partir da posição atual
    if (prevIdRef.current !== flyingToId) {
      prevIdRef.current        = flyingToId;
      arrivedFiredRef.current  = false;
      orbitCamReadyRef.current = false;
      if (flyingToId) {
        setHasArrived(false);
        setOrbitMode(false);
        setIsIntro(false);
        const fs = shipRef.current.position.clone().sub(SUN_POS);
        arcAngleRef.current  = Math.atan2(fs.z, fs.x);
        arcRadiusRef.current = Math.max(60, Math.sqrt(fs.x * fs.x + fs.z * fs.z));
      }
    }

    const liveTarget = flyingToId ? (planetPosRefs.current[flyingToId] ?? null) : null;

    // ── Intro ──
    if (isIntro) {
      shipRef.current.position.x = THREE.MathUtils.lerp(shipRef.current.position.x, 0, dt * 1.5);
      shipRef.current.position.z = THREE.MathUtils.lerp(shipRef.current.position.z, 0, dt * 1.5);
      shipRef.current.rotation.y = THREE.MathUtils.lerp(shipRef.current.rotation.y, 0, dt * 1.2);
      if (Math.abs(shipRef.current.position.x) < 0.05) setIsIntro(false);

    // ── Órbita ao redor do planeta ──
    } else if (orbitMode && liveTarget) {
      orbitAngleRef.current += dt * SHIP_ORBIT_SPEED;
      const a        = orbitAngleRef.current;
      const orbitPos = new THREE.Vector3(
        liveTarget.x + SHIP_ORBIT_R * Math.cos(a),
        liveTarget.y + SHIP_ORBIT_Y_OFF + 1.0 * Math.sin(a * 0.4),
        liveTarget.z + SHIP_ORBIT_R * Math.sin(a)
      );
      shipRef.current.position.lerp(orbitPos, dt * 2.5);
      const tangent = new THREE.Vector3(-Math.sin(a), 0.3 * Math.cos(a * 0.4), Math.cos(a)).normalize();
      const mat4    = new THREE.Matrix4().lookAt(orbitPos, orbitPos.clone().add(tangent), UP_VEC);
      shipRef.current.quaternion.slerp(new THREE.Quaternion().setFromRotationMatrix(mat4), dt * 3);

    // ── Voo orbital ao redor do sol ──
    } else if (flyingToId && liveTarget && !hasArrived) {
      // Ângulo e raio do planeta destino em relação ao sol
      const tf           = liveTarget.clone().sub(SUN_POS);
      const targetAngle  = Math.atan2(tf.z, tf.x);
      const targetRadius = Math.sqrt(tf.x * tf.x + tf.z * tf.z);

      // Diferença angular pelo caminho mais curto
      let angleDiff = targetAngle - arcAngleRef.current;
      while (angleDiff >  Math.PI) angleDiff -= 2 * Math.PI;
      while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      // Velocidade angular: acelera proporcional à distância, desacelera na chegada
      const angSpeed  = Math.min(1.4, Math.max(0.12, Math.abs(angleDiff) * 0.9));
      const angleStep = Math.sign(angleDiff) * angSpeed * dt;
      arcAngleRef.current  += Math.abs(angleStep) < Math.abs(angleDiff) ? angleStep : angleDiff;
      arcRadiusRef.current  = THREE.MathUtils.lerp(arcRadiusRef.current, targetRadius, dt * 1.2);

      const newPos = new THREE.Vector3(
        SUN_POS.x + arcRadiusRef.current * Math.cos(arcAngleRef.current),
        THREE.MathUtils.lerp(shipRef.current.position.y, liveTarget.y + SHIP_ORBIT_Y_OFF, dt * 1.5),
        SUN_POS.z + arcRadiusRef.current * Math.sin(arcAngleRef.current)
      );
      shipRef.current.position.copy(newPos);

      // Nariz aponta tangencialmente ao arco (na direção do movimento)
      const lead   = arcAngleRef.current + Math.sign(angleDiff) * 0.15;
      const lookAt = new THREE.Vector3(
        SUN_POS.x + arcRadiusRef.current * Math.cos(lead),
        newPos.y,
        SUN_POS.z + arcRadiusRef.current * Math.sin(lead)
      );
      const mat4 = new THREE.Matrix4().lookAt(newPos, lookAt, UP_VEC);
      shipRef.current.quaternion.slerp(new THREE.Quaternion().setFromRotationMatrix(mat4), dt * 5);

      // Chegada: quando a posição polar convergiu perto do planeta
      if (shipRef.current.position.distanceTo(liveTarget) < 19 && !arrivedFiredRef.current) {
        arrivedFiredRef.current = true;
        orbitAngleRef.current   = Math.atan2(
          shipRef.current.position.z - liveTarget.z,
          shipRef.current.position.x - liveTarget.x
        );
        setOrbitMode(true);
        setHasArrived(true);
        onArrive();
      }

    // ── Idle float ──
    } else if (!flyingToId) {
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    // ── Câmera ──
    if (orbitMode && liveTarget) {
      const camPos = liveTarget.clone().add(new THREE.Vector3(0, 8, 26));
      if (!orbitCamReadyRef.current) {
        camera.position.copy(camPos);
        orbitCamReadyRef.current = true;
      } else {
        camera.position.lerp(camPos, dt * 2.5);
      }
      camera.lookAt(liveTarget.clone().add(new THREE.Vector3(-17, -3, 0)));
    } else {
      const camOff = new THREE.Vector3(0, 3, 10).applyQuaternion(shipRef.current.quaternion);
      camera.position.lerp(shipRef.current.position.clone().add(camOff), dt * 3);
      camera.lookAt(shipRef.current.position);
    }
  });

  return (
    <group ref={shipRef} position={[-12, 0, 5]} rotation={[0, -Math.PI / 2, 0]}>
      <Suspense fallback={null}>
        <SpaceshipModel isMoving={(isMoving && !orbitMode) || isIntro} />
      </Suspense>
    </group>
  );
}

// ─── Planetas ─────────────────────────────────────────────────────────────────

function PlanetFBX({ url, color, size = 4 }) {
  const fbx = useLoader(FBXLoader, url);
  const model = useMemo(() => {
    const cloned = fbx.clone(true);
    const box  = new THREE.Box3().setFromObject(cloned);
    const dims = box.getSize(new THREE.Vector3());
    const s = (size * 2) / Math.max(dims.x, dims.y, dims.z);
    cloned.scale.setScalar(s);
    cloned.traverse((c) => {
      if (c.isMesh && (!c.material || c.material.name === 'Default-Material')) {
        c.material = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.2 });
      }
    });
    return cloned;
  }, [fbx, color, size]);
  return <primitive object={model} />;
}

function PlanetOBJ({ url, size = 4 }) {
  const groupRef = useRef();

  useEffect(() => {
    const mtlUrl = url.replace('.obj', '.mtl');
    let live = true;

    new MTLLoader().load(mtlUrl, (mtl) => {
      if (!live) return;
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load(url, (root) => {
        if (!live || !groupRef.current) return;

        const box    = new THREE.Box3().setFromObject(root);
        const dims   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const s      = (size * 2) / Math.max(dims.x, dims.y, dims.z);
        root.scale.setScalar(s);
        root.position.sub(center.multiplyScalar(s));

        root.traverse((c) => {
          if (!c.isMesh) return;
          const mats    = Array.isArray(c.material) ? c.material : [c.material];
          const newMats = mats.map((mat) => {
            const base = mat?.color ? new THREE.Color().copy(mat.color) : new THREE.Color(0.5, 0.5, 0.5);
            return new THREE.MeshStandardMaterial({
              color:     base,
              roughness: 0.65,
              metalness: 0.1,
            });
          });
          c.material = Array.isArray(c.material) ? newMats : newMats[0];
        });

        groupRef.current.clear();
        groupRef.current.add(root);
      });
    });

    return () => { live = false; };
  }, [url, size]);

  return <group ref={groupRef} />;
}

function ExplorePlanet({ config, onClick, isActive, isTargeted, updatePlanetPos, activePanelId }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isContent = !!config.label;
  const blocked        = isActive || isTargeted;
  const effectiveHover = hovered && !blocked;

  useEffect(() => {
    document.body.style.cursor = effectiveHover ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [effectiveHover]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const pos = getOrbitalPos(config, state.clock.elapsedTime);
    groupRef.current.position.copy(pos);
    groupRef.current.rotation.y += delta * 0.3;
    updatePlanetPos(config.id, pos);

    if (isContent) {
      const ts = effectiveHover ? 1.15 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(ts, ts, ts), delta * 4);
    }
  });

  if (activePanelId && activePanelId !== config.id) return null;

  return (
    <group ref={groupRef}>
      <group
        onPointerOver={(e) => { if (!isContent || blocked) return; e.stopPropagation(); setHovered(true);  }}
        onPointerOut={(e)  => { if (!isContent || blocked) return; e.stopPropagation(); setHovered(false); }}
        onClick={(e)       => { if (!isContent || isActive) return; e.stopPropagation(); onClick(config.id); }}
      >
        {config.modelUrl ? (
          <Suspense fallback={null}>
            <PlanetFBX url={config.modelUrl} color={config.color} size={config.size ?? 4} />
          </Suspense>
        ) : config.objUrl ? (
          <Suspense fallback={null}>
            <PlanetOBJ url={config.objUrl} color={config.color} size={config.size ?? 4} />
          </Suspense>
        ) : (
          <mesh>
            <sphereGeometry args={[config.size ?? 1.5, 32, 32]} />
            <meshStandardMaterial color={config.color} roughness={0.8} metalness={0.1} />
          </mesh>
        )}
      </group>
    </group>
  );
}

// ─── Painéis ──────────────────────────────────────────────────────────────────

function AboutPanel() {
  const { t } = useLanguage();
  return (
    <>
      <p className="hud-about-role">{t.ui.about.role}</p>

      <div className="explore__panel-content">
        <p>{t.about.paragraphs[0]}</p>
        <p>{t.about.paragraphs[3]}</p>
      </div>

      <div className="hud-about-stats">
        <div className="hud-about-stat">
          <span className="hud-about-stat__num">42+</span>
          <span className="hud-about-stat__label">{t.ui.about.stats.projects}</span>
        </div>
        <div className="hud-about-stat">
          <span className="hud-about-stat__num">8+</span>
          <span className="hud-about-stat__label">{t.ui.about.stats.years}</span>
        </div>
        <div className="hud-about-stat">
          <span className="hud-about-stat__num">60+</span>
          <span className="hud-about-stat__label">{t.ui.about.stats.clients}</span>
        </div>
      </div>

      <div className="hud-arsenal">
        <span className="hud-arsenal__label">STACK TÉCNICO</span>
        <div className="hud-arsenal__icons">
          {TECH_STACK.map((item) => (
            <div key={item.name} className="hud-arsenal__item">
              <img src={item.icon} alt={item.name} className="hud-arsenal__svg" />
              <span className="hud-arsenal__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ExperiencePanel() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const headerRefs = useRef([]);
  const videoRefs  = useRef([]);
  const n = t.experience.length;

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === selected) v.play().catch(() => {});
      else v.pause();
    });
  }, [selected]);

  useEffect(() => {
    const scrollEl = headerRefs.current[0]?.closest('.hud-panel-scroll');
    if (!scrollEl) return;
    let lastTime = 0;
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTime < 460) return;
      lastTime = now;
      if (e.deltaY > 0) setSelected(prev => Math.min(n - 1, prev + 1));
      else              setSelected(prev => Math.max(0, prev - 1));
    };
    scrollEl.addEventListener('wheel', onWheel, { passive: false });
    return () => scrollEl.removeEventListener('wheel', onWheel);
  }, [n]);

  useEffect(() => {
    const header = headerRefs.current[selected];
    if (!header) return;
    const tid = setTimeout(() => {
      const scrollEl = header.closest('.hud-panel-scroll');
      if (!scrollEl) return;
      const stickyEl = scrollEl.querySelector('.hud-projects-sticky-header');
      const stickyH  = stickyEl ? stickyEl.offsetHeight : 80;
      const delta = header.getBoundingClientRect().top
                  - scrollEl.getBoundingClientRect().top
                  - stickyH - 6;
      scrollEl.scrollBy({ top: delta, behavior: 'smooth' });
    }, 440);
    return () => clearTimeout(tid);
  }, [selected]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(prev => Math.max(0, prev - 1)); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(prev => Math.min(n - 1, prev + 1)); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [n]);

  return (
    <>
      <div className="hud-projects-sticky-header"></div>
      <div className="explore__panel-content">
        <div className="hud-projects">
          {t.experience.map((exp, i) => (
            <div
              key={i}
              className={`hud-project-item${selected === i ? ' is-selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <div className="hud-project-item__header" ref={el => { headerRefs.current[i] = el; }}>
                <span className="hud-project-item__index">{String(i + 1).padStart(2, '0')}</span>
                <div className="hud-experience-header-text">
                  <strong className="hud-project-item__title">{exp.company}</strong>
                  <span className="hud-experience-role">{exp.role}</span>
                </div>
                <span className="hud-experience-period">{exp.period}</span>
              </div>
              <div className="hud-project-item__expanded">
                <div className="hud-project-expanded-inner">
                  <div className="hud-project-expanded-content">
                    <div className="hud-project-expanded-layout">
                      <div className="hud-project-video-wrap">
                        <video
                          ref={el => { videoRefs.current[i] = el; }}
                          src={EXPERIENCE_VIDEOS[i]}
                          muted loop playsInline preload="metadata"
                          className="hud-project-video"
                        />
                      </div>
                      <div className="hud-project-text">
                        <p className="hud-project-item__desc">{exp.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectsPanel() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const headerRefs = useRef([]);
  const videoRefs  = useRef([]);
  const n = t.projects.length;

  // Play/pause — só o selecionado toca
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === selected) v.play().catch(() => {});
      else v.pause();
    });
  }, [selected]);

  // Wheel interceptado: 1 projeto por gesto, cooldown = duração da animação CSS
  useEffect(() => {
    const scrollEl = headerRefs.current[0]?.closest('.hud-panel-scroll');
    if (!scrollEl) return;
    let lastTime = 0;

    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTime < 460) return;
      lastTime = now;
      if (e.deltaY > 0) setSelected(prev => Math.min(n - 1, prev + 1));
      else              setSelected(prev => Math.max(0, prev - 1));
    };

    scrollEl.addEventListener('wheel', onWheel, { passive: false });
    return () => scrollEl.removeEventListener('wheel', onWheel);
  }, [n]);

  // Após a animação CSS (420ms), posiciona o header selecionado logo abaixo do sticky
  useEffect(() => {
    const header = headerRefs.current[selected];
    if (!header) return;
    const tid = setTimeout(() => {
      const scrollEl = header.closest('.hud-panel-scroll');
      if (!scrollEl) return;
      const stickyEl = scrollEl.querySelector('.hud-projects-sticky-header');
      const stickyH  = stickyEl ? stickyEl.offsetHeight : 80;
      const delta = header.getBoundingClientRect().top
                  - scrollEl.getBoundingClientRect().top
                  - stickyH
                  - 6;
      scrollEl.scrollBy({ top: delta, behavior: 'smooth' });
    }, 440);
    return () => clearTimeout(tid);
  }, [selected]);

  // Teclado — avança/recua 1 por vez
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected(prev => Math.max(0, prev - 1));
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected(prev => Math.min(n - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [n]);

  return (
    <>
      <div className="hud-projects-sticky-header"></div>
      <div className="explore__panel-content">
        <div className="hud-projects">
          {t.projects.map((p, i) => (
            <div
              key={p.id}
              className={`hud-project-item${selected === i ? ' is-selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <div
                className="hud-project-item__header"
                ref={el => { headerRefs.current[i] = el; }}
              >
                <span className="hud-project-item__index">{String(i + 1).padStart(2, '0')}</span>
                <strong className="hud-project-item__title">{p.title}</strong>
                <div className="hud-project-item__tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="hud-project-item__tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Container sempre montado — CSS anima a altura */}
              <div className="hud-project-item__expanded">
                <div className="hud-project-expanded-inner">
                  <div className="hud-project-expanded-content">
                    <div className="hud-project-expanded-layout">
                      <div className="hud-project-video-wrap">
                        <video
                          ref={el => { videoRefs.current[i] = el; }}
                          src={PROJECT_VIDEOS[i]}
                          muted loop playsInline preload="metadata"
                          className="hud-project-video"
                        />
                      </div>
                      <div className="hud-project-text">
                        <p className="hud-project-item__desc">{p.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ContactPanel() {
  const { t } = useLanguage();
  return (
    <>
      <div className="explore__panel-content">
        <p className="hud-contact-subtitle">{t.ui.contact.subtitle}</p>
        <div className="hud-contact-icons">
          <a href={social.linkedin} target="_blank" rel="noreferrer"
             className="hud-contact-icon-link" aria-label="LinkedIn">
            <img src={LinkedinIcon} alt="LinkedIn" className="hud-contact-icon-img" />
            <span className="hud-contact-icon-label">LinkedIn</span>
          </a>
          <a href={`mailto:${social.email}`}
             className="hud-contact-icon-link" aria-label="Email">
            <img src={EmailIcon} alt="Email" className="hud-contact-icon-img" />
            <span className="hud-contact-icon-label">Email</span>
          </a>
          <a href={social.github} target="_blank" rel="noreferrer"
             className="hud-contact-icon-link" aria-label="GitHub">
            <img src={GithubIcon} alt="GitHub" className="hud-contact-icon-img" />
            <span className="hud-contact-icon-label">GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}

// ─── Grilo 3D (carregado dentro do mini Canvas abaixo) ────────────────────────

function GrasshopperModel3D() {
  const ref = useRef();
  const mtl = useLoader(MTLLoader, '/bugs/grasshopper/GrassHoper_8.mtl');
  const obj = useLoader(OBJLoader, '/bugs/grasshopper/GrassHoper_8.obj', (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  // Clone para evitar mutação do objeto cacheado entre remounts
  const { clone, scale: s, offset } = useMemo(() => {
    const cloned = obj.clone(true);
    const box    = new THREE.Box3().setFromObject(cloned);
    const size   = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    return { clone: cloned, scale: maxDim > 0 ? 2 / maxDim : 1, offset: center.negate() };
  }, [obj]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.9;
  });

  return (
    <group ref={ref} scale={s}>
      <primitive object={clone} position={offset.toArray()} />
    </group>
  );
}

function GrasshopperCTA({ onOpenGame, alreadyRevealed, onReveal }) {
  const [visible, setVisible] = useState(alreadyRevealed);
  const wasRevealedRef = useRef(alreadyRevealed);
  const onRevealRef    = useRef(onReveal);

  useEffect(() => {
    if (wasRevealedRef.current) return;
    const tid = setTimeout(() => { setVisible(true); onRevealRef.current(); }, 2800);
    return () => clearTimeout(tid);
  }, []);

  if (!onOpenGame) return null;
  return (
    <div className={`hud-game-cta${visible ? ' hud-game-cta--visible' : ''}`}>
      <div className="hud-game-cta__header">
        <span className="hud-game-cta__badge">⚠ AMEAÇA DETECTADA</span>
      </div>
      <div className="hud-game-cta__row">
        <div className="hud-game-cta__viewer">
          <Canvas
            camera={{ position: [0, 0.3, 4], fov: 48 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={1.2} />
              <pointLight position={[4, 3, 3]}  intensity={5}  color="#ffaa00" />
              <pointLight position={[-3, -2, 2]} intensity={2.5} color="#ff4400" />
              <GrasshopperModel3D />
            </Suspense>
          </Canvas>
        </div>
        <p className="hud-game-cta__desc">
          Uma frota de bugs foi detectada no perímetro. Os sistemas de contenção automática falharam. Precisamos de um operador para assumir o controle
        </p>
        <button className="hud-game-cta__btn" onClick={onOpenGame}>
          ACEITAR MISSÃO
        </button>
      </div>
    </div>
  );
}

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function ExploreMode({ onClose/*, onOpenGame*/ }) {
  const [activePanelId, setActivePanelId] = useState(null);
  const [flyingToId,    setFlyingToId]    = useState(null);
  // const [ctaRevealed, setCtaRevealed] = useState(false);
  const planetPosRefs    = useRef({});
  const updatePlanetPos  = useCallback((id, pos) => {
    planetPosRefs.current[id] = pos;
  }, []);

  const currentIndex = flyingToId ? CONTENT_PLANETS.findIndex(p => p.id === flyingToId) : -1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev || 'auto'; };
  }, []);

  const startFlight = (id) => {
    setActivePanelId(null);
    setFlyingToId(id);
  };

  const onFlightArrive = () => setActivePanelId(flyingToId);

  const goNext = () => {
    const next = (currentIndex >= 0 && currentIndex < CONTENT_PLANETS.length - 1)
      ? CONTENT_PLANETS[currentIndex + 1]
      : CONTENT_PLANETS[0];
    startFlight(next.id);
  };

  const goPrev = () => {
    const prev = currentIndex > 0
      ? CONTENT_PLANETS[currentIndex - 1]
      : CONTENT_PLANETS[CONTENT_PLANETS.length - 1];
    startFlight(prev.id);
  };

  const closePanelAndOverview = () => {
    setActivePanelId(null);
    setFlyingToId(null);
  };

  const currentPlanet = CONTENT_PLANETS.find(p => p.id === activePanelId);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { if (activePanelId) closePanelAndOverview(); else onClose(); return; }
      // ArrowLeft/Right navegam entre planetas sempre
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activePanelId]);

  return (
    <div className="explore-mode">
      <div className="explore__top-bar">
        <nav className="explore__bar">
          <span className="explore__bar-logo">Kezia Oliveira</span>
          <div className="explore__progress">
            {CONTENT_PLANETS.map((p) => (
              <span
                key={p.id}
                className={`explore__progress-item ${(activePanelId === p.id || flyingToId === p.id) ? 'is-active' : ''}`}
                style={{ '--item-color': p.color }}
                onClick={() => startFlight(p.id)}
              >{p.label}</span>
            ))}
          </div>
          <button className="explore__back-btn" onClick={onClose}>Voltar ao Portfólio</button>
        </nav>
      </div>

      <Canvas camera={{ position: [0, 2, 6], fov: 60 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={2.2} />
          <pointLight position={[10, 10, 10]} intensity={3.0} />
          <pointLight position={[-8,  5,   5]} intensity={2.0} color="#c8d8ff" />

          <Stars radius={200} depth={100} count={4000} factor={6} saturation={0} fade speed={0.8} />

          <Sun />

          <Spaceship
            flyingToId={flyingToId}
            planetPosRefs={planetPosRefs}
            onArrive={onFlightArrive}
            isMoving={!!flyingToId}
          />

          {[...CONTENT_PLANETS, ...DECO_PLANETS].map(cfg => (
            <ExplorePlanet
              key={cfg.id}
              config={cfg}
              onClick={startFlight}
              isActive={activePanelId === cfg.id}
              isTargeted={flyingToId === cfg.id}
              updatePlanetPos={updatePlanetPos}
              activePanelId={activePanelId}
            />
          ))}
        </Suspense>
      </Canvas>

      {!activePanelId && !flyingToId && (
        <div className="explore__hint">
          Use as setinhas do teclado
          <span className="explore__hint-key">←</span>
          <span className="explore__hint-key">→</span>
          para navegar entre os planetas
          <span className="explore__hint-divider" />
          Clique nos tópicos da barra para voar até eles
          <span className="explore__hint-divider" />
          <span className="explore__hint-key">ESC</span>
          Voltar ao portfólio
        </div>
      )}

      {activePanelId && (
        <div className={`explore__panel-overlay${activePanelId === 'contato' ? ' explore__panel-overlay--col' : ''}`}>
          <div
            className="explore__panel-wrap"
            style={{
              '--planet-color': currentPlanet?.color ?? '#3b82f6',
              '--planet-glow':  `${currentPlanet?.color ?? '#3b82f6'}2a`,
            }}
          >
            <div className="explore__panel">
              <div className="hud-header">
                <span className="hud-header__tag">MODO EXPLORAÇÃO</span>
                <span className="hud-header__planet">{currentPlanet?.label}</span>
                <span className="hud-header__status">
                  <span className="hud-header__dot" />
                  ORBITANDO
                </span>
              </div>
              <div className="hud-panel-scroll">
                {activePanelId === 'sobre'       && <AboutPanel />}
                {activePanelId === 'experiencia' && <ExperiencePanel />}
                {activePanelId === 'projetos'    && <ProjectsPanel />}
                {activePanelId === 'contato'     && <ContactPanel />}
              </div>
            </div>
          </div>
          {/* GRASSHOPPER CTA — temporariamente desativado
          {activePanelId === 'contato' && (
            <GrasshopperCTA onOpenGame={onOpenGame} alreadyRevealed={ctaRevealed} onReveal={() => setCtaRevealed(true)} />
          )}
          */}
        </div>
      )}
    </div>
  );
}
