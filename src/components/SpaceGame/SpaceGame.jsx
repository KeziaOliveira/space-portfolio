import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import './SpaceGame.css';

// ─── Config ─────────────────────────────────────────────────────────────────

const BUG_CONFIGS = [
  { id: 'ladybug',     obj: '/bugs/ladybug/Mesh_Ladybug.obj',         tex: '/bugs/ladybug/Tex_LadyBug.png',          error: 'NullPointerException', behavior: 'classic', hp: 1, pts: 10,  color: '#ff3333' },
  { id: 'butterfly',   obj: '/bugs/butterfly2/PUSHILIN_butterfly.obj', tex: '/bugs/butterfly2/PUSHILIN_butterfly.png', error: 'CSSException',         behavior: 'sine',    hp: 1, pts: 15,  color: '#ff88ff' },
  { id: 'beetle',      obj: '/bugs/beetle/Mesh_Beetle.obj',           tex: '/bugs/beetle/Tex_Beetle.png',            error: 'DependencyConflict',   behavior: 'tanky',   hp: 2, pts: 25,  color: '#8B4513' },
  { id: 'dragonfly',   obj: '/bugs/dragonfly/Mesh_Dragonfly.obj',     tex: '/bugs/dragonfly/Tex_Dragonfly.png',      error: 'RaceCondition',        behavior: 'zigzag',  hp: 1, pts: 20,  color: '#00ccff' },
  { id: 'hornet',      obj: '/bugs/hornet/Mesh_Hornet.obj',           tex: '/bugs/hornet/Tex_Hornet.png',            error: 'ProductionError',      behavior: 'chase',   hp: 1, pts: 30,  color: '#ffaa00' },
  { id: 'cockroach',   obj: '/bugs/cockroach/Mesh_Cockroach.obj',     tex: '/bugs/cockroach/Tex_Cockroach.png',      error: 'LegacyCodeBug',        behavior: 'split',   hp: 1, pts: 35,  color: '#888800' },
  { id: 'spider',      obj: '/bugs/spider/Spider_01.obj',             tex: null,                                     error: 'MemoryLeak',           behavior: 'drop',    hp: 1, pts: 20,  color: '#cc44cc' },
  { id: 'moth',        obj: '/bugs/moth/model.obj',                   tex: null,                                     error: 'InfiniteLoop',         behavior: 'spiral',  hp: 1, pts: 25,  color: '#aaaaff' },
  { id: 'grasshopper', obj: '/bugs/grasshopper/GrassHoper_8.obj',     tex: null,                                     error: 'OffByOneError',        behavior: 'jump',    hp: 1, pts: 20,  color: '#44cc44' },
];

const BUG_BY_ID = Object.fromEntries(BUG_CONFIGS.map(b => [b.id, b]));

const KILL_MSGS = {
  NullPointerException: 'NullPointerException: SQUASHED!',
  CSSException:         'CSSException: Stylesheet PATCHED!',
  DependencyConflict:   'DependencyConflict: npm ci --fixed!',
  RaceCondition:        'RaceCondition: Thread TERMINATED!',
  ProductionError:      'ProductionError: Hotfix DEPLOYED!',
  LegacyCodeBug:        'LegacyCode: git blame yourself. DELETED!',
  MemoryLeak:           'MemoryLeak: free() CALLED!',
  InfiniteLoop:         'InfiniteLoop: break INSERTED!',
  OffByOneError:        'OffByOneError: i-- CORRECTED!',
};

const WAVES = [
  { n: 1,  types: ['ladybug'],                                                                           count: 8,  spd: 1.0,  msg: 'WAVE 1 — LOGIC ERRORS DETECTED'      },
  { n: 2,  types: ['ladybug', 'butterfly'],                                                              count: 10, spd: 1.2,  msg: 'WAVE 2 — CSS BUGS INCOMING'           },
  { n: 3,  types: ['beetle', 'ladybug'],                                                                 count: 10, spd: 1.35, msg: 'WAVE 3 — DEPENDENCY HELL'             },
  { n: 4,  types: ['dragonfly', 'beetle'],                                                               count: 12, spd: 1.5,  msg: 'WAVE 4 — RACE CONDITIONS DETECTED'    },
  { n: 5,  types: ['hornet', 'dragonfly'],                                                               count: 12, spd: 1.7,  msg: 'WAVE 5 — ⚠ PRODUCTION IS DOWN'       },
  { n: 6,  types: ['cockroach', 'hornet'],                                                               count: 14, spd: 1.9,  msg: 'WAVE 6 — LEGACY CODE STRIKES BACK'   },
  { n: 7,  types: ['spider', 'cockroach'],                                                               count: 14, spd: 2.1,  msg: 'WAVE 7 — MEMORY LEAKS EVERYWHERE'    },
  { n: 8,  types: ['moth', 'spider', 'hornet'],                                                          count: 16, spd: 2.3,  msg: 'WAVE 8 — INFINITE LOOPS DETECTED'    },
  { n: 9,  types: ['grasshopper', 'moth', 'beetle'],                                                     count: 16, spd: 2.5,  msg: 'WAVE 9 — OFF-BY-ONE CHAOS'           },
  { n: 10, types: ['ladybug','beetle','dragonfly','hornet','cockroach','spider','moth','grasshopper','butterfly'], count: 20, spd: 3.0, msg: 'WAVE 10 — ⚠ SYSTEM CRITICAL' },
];

const MAX_LASERS    = 40;
const BOUNDARY_X    = 9;
const PLAYER_Y      = -5.8;
const FLOOR_Y       = -7.0;
const BUG_SCALE     = 0.72;   // units — normalised size for every bug
const COLLISION_R   = 0.46;   // collision detection radius

// ─── OBJ Model Loader ────────────────────────────────────────────────────────

async function loadBugModels() {
  const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
  const texLoader = new THREE.TextureLoader();

  const loadTex = path =>
    new Promise(resolve => {
      texLoader.load(
        path,
        t => { t.colorSpace = THREE.SRGBColorSpace; resolve(t); },
        undefined,
        () => resolve(null)
      );
    });

  const result = {};

  await Promise.allSettled(
    BUG_CONFIGS.map(async bug => {
      try {
        // Load texture independently so MTL quirks can't block it
        const tex = bug.tex ? await loadTex(bug.tex) : null;

        // Material: texture if available, otherwise solid colour
        const mat = new THREE.MeshPhongMaterial({
          map:      tex,
          color:    tex ? '#ffffff' : new THREE.Color(bug.color),
          emissive: new THREE.Color(bug.color),
          emissiveIntensity: tex ? 0.08 : 0.35,
          shininess: 55,
          side: THREE.DoubleSide,
        });

        // Load geometry only (no MTL, avoids illum/Kd weirdness)
        const objLoader = new OBJLoader();
        const raw = await objLoader.loadAsync(bug.obj);

        raw.traverse(c => {
          if (c.isMesh) c.material = mat.clone();
        });

        // Normalise scale
        const box = new THREE.Box3().setFromObject(raw);
        const sz  = new THREE.Vector3();
        box.getSize(sz);
        const maxDim = Math.max(sz.x, sz.y, sz.z);
        if (maxDim > 0) raw.scale.setScalar(BUG_SCALE / maxDim);

        // Centre within wrapper
        const wrapper = new THREE.Group();
        const box2    = new THREE.Box3().setFromObject(raw);
        const centre  = new THREE.Vector3();
        box2.getCenter(centre);
        raw.position.sub(centre);
        wrapper.add(raw);

        result[bug.id] = wrapper;
      } catch (err) {
        console.warn(`[DEBUG.EXE] Could not load ${bug.id}:`, err.message);
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.38, 12, 8),
          new THREE.MeshPhongMaterial({ color: bug.color, emissive: bug.color, emissiveIntensity: 0.4, shininess: 40 })
        );
        const wrapper = new THREE.Group();
        wrapper.add(mesh);
        result[bug.id] = wrapper;
      }
    })
  );

  // ── Spaceship model — same material pipeline as SpaceshipButtonIcon (Hero) ──
  try {
    const { MTLLoader } = await import('three/examples/jsm/loaders/MTLLoader.js');

    const mtlLoader = new MTLLoader();
    const shipMats  = await mtlLoader.loadAsync(
      '/spaceship/Lo_poly_Spaceship_01_by_Liz_Reddington.mtl'
    );
    shipMats.preload();

    const shipObjLoader = new OBJLoader();
    shipObjLoader.setMaterials(shipMats);
    const rawShip = await shipObjLoader.loadAsync(
      '/spaceship/Lo_poly_Spaceship_01_by_Liz_Reddington.obj'
    );

    // Identical emissive boost to Hero's SpaceshipButtonIcon
    const applyEmissive = mat => {
      const m = mat.clone();
      m.emissive = m.color
        ? m.color.clone().multiplyScalar(0.5)
        : new THREE.Color(0.3, 0.3, 0.3);
      m.emissiveIntensity = 0.7;
      m.needsUpdate = true;
      return m;
    };
    rawShip.traverse(c => {
      if (!c.isMesh || !c.material) return;
      c.material = Array.isArray(c.material)
        ? c.material.map(applyEmissive)
        : applyEmissive(c.material);
    });

    // Normalise scale to ~1.8 units
    const sBox = new THREE.Box3().setFromObject(rawShip);
    const sSz  = new THREE.Vector3();
    sBox.getSize(sSz);
    rawShip.scale.setScalar(1.8 / Math.max(sSz.x, sSz.y, sSz.z));

    // Centre within wrapper; rotate nose to point up (+Y)
    const sWrapper = new THREE.Group();
    const sBox2    = new THREE.Box3().setFromObject(rawShip);
    const sCentre  = new THREE.Vector3();
    sBox2.getCenter(sCentre);
    rawShip.position.sub(sCentre);
    rawShip.rotation.set(-Math.PI / 2, 0, 0);
    sWrapper.add(rawShip);

    result['_ship'] = sWrapper;
  } catch (err) {
    console.warn('[DEBUG.EXE] Could not load spaceship:', err.message);
    result['_ship'] = null;
  }

  return result;
}

// ─── Bug clone helper ─────────────────────────────────────────────────────────

function cloneBug(proto) {
  const obj = proto.clone();
  // Each clone gets its own material instances for per-enemy tinting
  obj.traverse(c => {
    if (!c.isMesh) return;
    c.material = Array.isArray(c.material)
      ? c.material.map(m => m.clone())
      : c.material.clone();
  });
  return obj;
}

function setEmissive(group, hexColor, intensity) {
  group.traverse(c => {
    if (!c.isMesh) return;
    const mats = Array.isArray(c.material) ? c.material : [c.material];
    mats.forEach(m => {
      if (m?.emissive) {
        m.emissive.set(hexColor);
        if (intensity !== undefined) m.emissiveIntensity = intensity;
      }
    });
  });
}

// ─── Particle & split helpers ────────────────────────────────────────────────

function spawnParticles(gd, group, pos, color) {
  if (!group) return;
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 4, 4),
      new THREE.MeshBasicMaterial({ color, transparent: true })
    );
    mesh.position.copy(pos);
    const angle = (i / 10) * Math.PI * 2;
    const spd   = 2.5 + Math.random() * 3;
    group.add(mesh);
    gd.particles.push({
      mesh,
      vel: new THREE.Vector3(Math.cos(angle) * spd, Math.sin(angle) * spd + 1, 0),
      life: 0.45 + Math.random() * 0.25,
      maxLife: 0.7,
    });
  }
}

function spawnSplitChildren(gd, group, parent, models) {
  if (!group) return;
  for (let i = 0; i < 2; i++) {
    const proto   = models?.['ladybug'];
    const obj     = proto ? cloneBug(proto) : (() => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 6), new THREE.MeshLambertMaterial({ color: '#aaaa00' })));
      return g;
    })();
    obj.scale.setScalar(0.55);
    obj.position.copy(parent.mesh.position);
    group.add(obj);

    const bstate = {
      dir: i === 0 ? 1 : -1, sineOffset: 0,
      baseX: obj.position.x, baseY: obj.position.y,
      spiralAngle: 0, jumpTimer: 0, jumpVelX: (i === 0 ? 3 : -3), jumpVelY: 2,
      dropTimer: 0, dropActive: true, hitFlash: 0,
    };
    gd.enemies.push({
      mesh: obj,
      config: { ...BUG_BY_ID['ladybug'], id: 'ladybug_baby', pts: 5, behavior: 'zigzag', color: '#aaaa00' },
      hp: 1, active: true, bstate,
    });
  }
}

// ─── makeBstate ──────────────────────────────────────────────────────────────

function makeBstate(obj, i, cols) {
  return {
    dir: 1,
    sineOffset: i * 0.4,
    baseX: obj.position.x,
    baseY: obj.position.y,
    spiralAngle: (i / Math.max(cols, 1)) * Math.PI * 2,
    jumpTimer: 0.5 + Math.random() * 1.5,
    jumpVelX: 0, jumpVelY: 0,
    dropTimer: 1 + Math.random() * 3,
    dropActive: false,
    hitFlash: 0,
  };
}

// ─── GameScene ───────────────────────────────────────────────────────────────

function GameScene({ wave, playing, onScore, onKill, onGameOver, onWaveClear, touchRef, modelsRef }) {
  const groupRef = useRef();
  const gd = useRef({
    player: null, engineFireL: null, engineFireR: null,
    enemies: [], lasers: [], particles: [],
    keys: {}, lastShot: 0, waveDone: false, gameOverFired: false,
  });

  // Keyboard
  useEffect(() => {
    const dn = e => { gd.current.keys[e.key] = true;  if (e.key === ' ') e.preventDefault(); };
    const up = e => { gd.current.keys[e.key] = false; };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
  }, []);

  // Player + laser pool (once on mount)
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Use the loaded 3D ship model, or fall back to geometric shape
    const proto = modelsRef.current['_ship'];
    let ship;
    if (proto) {
      ship = proto.clone();
      ship.traverse(c => {
        if (!c.isMesh || !c.material) return;
        c.material = Array.isArray(c.material)
          ? c.material.map(m => m.clone())
          : c.material.clone();
      });
    } else {
      // Fallback geometric ship
      const bodyMat = new THREE.MeshStandardMaterial({ color: '#3b82f6', emissive: '#1e40af', emissiveIntensity: 0.8 });
      const wingMat = new THREE.MeshStandardMaterial({ color: '#60a5fa', emissive: '#2563eb', emissiveIntensity: 0.6 });
      ship = new THREE.Group();
      const body  = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.4, 3), bodyMat);
      const lWing = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.85, 3), wingMat);
      const rWing = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.85, 3), wingMat);
      lWing.position.set(-0.48, -0.32, 0); lWing.rotation.z = -0.55;
      rWing.position.set( 0.48, -0.32, 0); rWing.rotation.z =  0.55;
      ship.add(body, lWing, rWing);
    }

    // Two blue engine fires — positioned BELOW the ship body, hidden until moving
    const makeFireMesh = (xPos) => {
      const m = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.38, 10),
        new THREE.MeshStandardMaterial({
          color: '#60a5fa', emissive: '#3b82f6', emissiveIntensity: 8,
          transparent: true, opacity: 0.9,
          depthWrite: false,
        })
      );
      // Y=-1.05 places the cone base well below the ship's bottom edge
      m.position.set(xPos, -1.05, 0);
      m.rotation.x = Math.PI; // tip points downward
      m.visible = false;
      ship.add(m);
      return m;
    };
    gd.current.engineFireL = makeFireMesh(-0.44);
    gd.current.engineFireR = makeFireMesh( 0.44);

    ship.position.set(0, PLAYER_Y, 0);
    group.add(ship);
    gd.current.player = ship;

    const lMat = new THREE.MeshBasicMaterial({ color: '#fde68a' });
    for (let i = 0; i < MAX_LASERS; i++) {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.65), lMat);
      mesh.visible = false;
      group.add(mesh);
      gd.current.lasers.push({ mesh, active: false });
    }

    const gdRef = gd.current;
    return () => {
      while (group.children.length) group.remove(group.children[0]);
      gdRef.player = null; gdRef.engineFireL = null; gdRef.engineFireR = null;
      gdRef.lasers = []; gdRef.enemies = []; gdRef.particles = [];
    };
  }, []);

  // Spawn wave
  useEffect(() => {
    if (!playing) return;
    const group = groupRef.current;
    if (!group) return;
    const g = gd.current;
    const models = modelsRef.current;

    g.enemies.forEach(e => group.remove(e.mesh));
    g.particles.forEach(p => { group.remove(p.mesh); p.mesh.geometry.dispose(); });
    g.enemies = []; g.particles = [];
    g.waveDone = false; g.gameOverFired = false;

    const cfg   = WAVES[Math.min(wave - 1, WAVES.length - 1)];
    const count = cfg.count;
    const cols  = Math.min(8, Math.ceil(Math.sqrt(count * 1.6)));

    for (let i = 0; i < count; i++) {
      const typeId = cfg.types[i % cfg.types.length];
      const config = BUG_BY_ID[typeId];
      const proto  = models[typeId];

      const obj = proto ? cloneBug(proto) : (() => {
        const g2 = new THREE.Group();
        g2.add(new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 7), new THREE.MeshLambertMaterial({ color: config.color })));
        return g2;
      })();

      const col    = i % cols;
      const row    = Math.floor(i / cols);
      const startX = -((cols - 1) * 1.85) / 2;
      obj.position.set(startX + col * 1.85, 4.5 + row * 1.55, 0);

      group.add(obj);
      g.enemies.push({ mesh: obj, config, hp: config.hp, active: true, bstate: makeBstate(obj, i, cols) });
    }

    if (g.player) g.player.position.set(0, PLAYER_Y, 0);
    g.lasers.forEach(l => { l.mesh.visible = false; l.active = false; });
  }, [wave, playing, modelsRef]);

  useFrame((state, delta) => {
    if (!playing) return;
    const g  = gd.current;
    if (!g.player) return;

    const dt    = Math.min(delta, 0.05);
    const t     = state.clock.elapsedTime;
    const keys  = g.keys;
    const touch = touchRef?.current || {};

    // ── Player ──
    const movingLeft  = !!(keys['ArrowLeft']  || touch.left);
    const movingRight = !!(keys['ArrowRight'] || touch.right);
    if (movingLeft  && g.player.position.x > -BOUNDARY_X) g.player.position.x -= 14 * dt;
    if (movingRight && g.player.position.x <  BOUNDARY_X) g.player.position.x += 14 * dt;

    // ── Engine fires — physics: opposite engine thrusts to drive direction ──
    if (g.engineFireL) {
      g.engineFireL.visible = movingRight;
      if (movingRight) {
        const f = Math.sin(t * 30) * 0.1;
        g.engineFireL.scale.set(1 + f, 1.5 + f, 1 + f);
      }
    }
    if (g.engineFireR) {
      g.engineFireR.visible = movingLeft;
      if (movingLeft) {
        const f = Math.sin(t * 30 + 1.2) * 0.1;
        g.engineFireR.scale.set(1 + f, 1.5 + f, 1 + f);
      }
    }

    // ── Shoot ──
    if ((keys[' '] || touch.shoot) && t - g.lastShot > 0.22) {
      g.lastShot = t;
      const laser = g.lasers.find(l => !l.active);
      if (laser) {
        laser.mesh.position.copy(g.player.position);
        laser.mesh.position.y += 1.0;
        laser.active = true; laser.mesh.visible = true;
      }
    }

    // ── Lasers ──
    g.lasers.forEach(l => {
      if (!l.active) return;
      l.mesh.position.y += 22 * dt;
      if (l.mesh.position.y > 10) { l.active = false; l.mesh.visible = false; }
    });

    // ── Enemies ──
    const spd = WAVES[Math.min(wave - 1, WAVES.length - 1)].spd;
    const px  = g.player.position.x;

    g.enemies.forEach(en => {
      if (!en.active) return;
      const bs = en.bstate;
      const m  = en.mesh;

      // Gentle spin so 3D models look dynamic
      m.rotation.y += 0.55 * dt;

      switch (en.config.behavior) {
        case 'classic':
          m.position.x += spd * bs.dir * dt;
          if (m.position.x > BOUNDARY_X - 0.4 || m.position.x < -BOUNDARY_X + 0.4) {
            bs.dir *= -1; m.position.y -= 0.45;
          }
          break;
        case 'sine':
          m.position.x = bs.baseX + Math.sin(t * 1.6 + bs.sineOffset) * 3.2;
          m.position.y -= spd * 0.28 * dt;
          break;
        case 'tanky':
          m.position.x += spd * 0.55 * bs.dir * dt;
          if (m.position.x > BOUNDARY_X - 0.4 || m.position.x < -BOUNDARY_X + 0.4) {
            bs.dir *= -1; m.position.y -= 0.5;
          }
          break;
        case 'zigzag':
          m.position.x += spd * 1.6 * bs.dir * dt;
          m.position.y -= spd * 0.38 * dt;
          if (m.position.x > BOUNDARY_X - 0.3 || m.position.x < -BOUNDARY_X + 0.3) bs.dir *= -1;
          break;
        case 'chase':
          m.position.x += (px - m.position.x) * Math.min(spd * 0.9, 3.5) * dt;
          m.position.y -= spd * 0.32 * dt;
          break;
        case 'split':
          m.position.x += spd * 0.85 * bs.dir * dt;
          m.position.y -= spd * 0.28 * dt;
          if (m.position.x > BOUNDARY_X - 0.4 || m.position.x < -BOUNDARY_X + 0.4) bs.dir *= -1;
          break;
        case 'drop':
          bs.dropTimer -= dt;
          if (!bs.dropActive && bs.dropTimer <= 0) bs.dropActive = true;
          if (bs.dropActive) {
            m.position.y -= spd * 1.8 * dt;
            if (m.position.y < -7.5) {
              m.position.set((Math.random() - 0.5) * BOUNDARY_X * 1.8, 5.5 + Math.random() * 2, 0);
              bs.dropActive = false; bs.dropTimer = 1 + Math.random() * 2.5;
              bs.baseX = m.position.x; bs.baseY = m.position.y;
            }
          }
          break;
        case 'spiral': {
          bs.spiralAngle += spd * 1.1 * dt;
          m.position.x = bs.baseX + Math.cos(bs.spiralAngle) * 2.8;
          m.position.y = bs.baseY + Math.sin(bs.spiralAngle) * 1.2;
          bs.baseY -= spd * 0.14 * dt;
          break;
        }
        case 'jump':
          bs.jumpTimer -= dt;
          if (bs.jumpTimer <= 0) {
            bs.jumpTimer = 0.7 + Math.random() * 1.2;
            bs.jumpVelX = (Math.random() - 0.5) * 9;
            bs.jumpVelY = 2 + Math.random() * 2;
          }
          m.position.x += bs.jumpVelX * dt;
          m.position.y += bs.jumpVelY * dt;
          bs.jumpVelY -= 8 * dt;
          m.position.x = Math.max(-BOUNDARY_X, Math.min(BOUNDARY_X, m.position.x));
          break;
      }

      if (en.config.behavior !== 'drop' && m.position.y < FLOOR_Y && !g.gameOverFired) {
        g.gameOverFired = true; onGameOver();
      }
    });

    // ── Particles ──
    g.particles = g.particles.filter(p => {
      p.life -= dt;
      if (p.life <= 0) { groupRef.current?.remove(p.mesh); p.mesh.geometry.dispose(); return false; }
      p.mesh.position.addScaledVector(p.vel, dt);
      p.vel.y -= 4 * dt;
      p.mesh.material.opacity = p.life / p.maxLife;
      return true;
    });

    // ── Collisions ──
    const group = groupRef.current;
    g.lasers.forEach(laser => {
      if (!laser.active) return;
      g.enemies.forEach(en => {
        if (!en.active) return;
        const dx = laser.mesh.position.x - en.mesh.position.x;
        const dy = laser.mesh.position.y - en.mesh.position.y;
        if (Math.sqrt(dx * dx + dy * dy) < COLLISION_R) {
          laser.active = false; laser.mesh.visible = false;
          en.hp--;
          if (en.hp <= 0) {
            if (en.config.behavior === 'split') spawnSplitChildren(g, group, en, modelsRef.current);
            spawnParticles(g, group, en.mesh.position, en.config.color);
            group?.remove(en.mesh);
            en.active = false;
            onScore(en.config.pts);
            onKill(KILL_MSGS[en.config.error]);
          } else {
            // Tanky bug hit flash
            en.bstate.hitFlash = 0.3;
            setEmissive(en.mesh, '#ff4444', 0.9);
          }
        }
      });
    });

    // Restore emissive after flash
    g.enemies.forEach(en => {
      if (!en.active || en.bstate.hitFlash <= 0) return;
      en.bstate.hitFlash -= dt;
      if (en.bstate.hitFlash <= 0) setEmissive(en.mesh, '#ffffff', 0.12);
    });

    // ── Wave clear ──
    const alive = g.enemies.filter(e => e.active).length;
    if (alive === 0 && g.enemies.length > 0 && !g.waveDone) {
      g.waveDone = true; onWaveClear();
    }
  });

  return (
    <>
      <ambientLight intensity={2.8} />
      <pointLight position={[3, 3, 8]}   intensity={4.0} />
      <pointLight position={[-3, 1, 8]}  intensity={2.5} color="#c8d8ff" />
      <pointLight position={[0, -4, 6]}  intensity={1.8} />
      <Stars radius={100} depth={50} count={2500} factor={4} fade speed={0.8} />
      <group ref={groupRef} />
    </>
  );
}

// ─── Root component ──────────────────────────────────────────────────────────

export default function SpaceGame({ onClose }) {
  const [gameState,   setGameState]   = useState('menu');
  const [score,       setScore]       = useState(0);
  const [wave,        setWave]        = useState(1);
  const [killMsg,     setKillMsg]     = useState(null);
  const [waveMsg,     setWaveMsg]     = useState(null);
  const [gameKey,     setGameKey]     = useState(0);
  const [isLoading,   setIsLoading]   = useState(true);
  const [highScores,  setHighScores]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('debug_exe_scores') || '[]'); }
    catch { return []; }
  });

  const scoreRef  = useRef(0);
  const waveRef   = useRef(1);
  const touchRef  = useRef({ left: false, right: false, shoot: false });
  const modelsRef = useRef({});
  const killTimer = useRef(null);
  const waveTimer = useRef(null);

  // Load 3D models when game opens
  useEffect(() => {
    loadBugModels().then(models => {
      modelsRef.current = models;
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const saveScore = useCallback(() => {
    const s = scoreRef.current;
    setHighScores(prev => {
      const updated = [...prev, s].sort((a, b) => b - a).slice(0, 3);
      localStorage.setItem('debug_exe_scores', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleScore = useCallback((pts) => {
    scoreRef.current += pts;
    setScore(scoreRef.current);
  }, []);

  const handleKill = useCallback((msg) => {
    setKillMsg(msg);
    clearTimeout(killTimer.current);
    killTimer.current = setTimeout(() => setKillMsg(null), 1800);
  }, []);

  const handleGameOver = useCallback(() => {
    saveScore(); setGameState('gameover');
  }, [saveScore]);

  const handleWaveClear = useCallback(() => {
    const cur = waveRef.current;
    if (cur >= WAVES.length) { saveScore(); setGameState('victory'); return; }
    const next = cur + 1;
    setWaveMsg(WAVES[next - 1].msg);
    clearTimeout(waveTimer.current);
    waveTimer.current = setTimeout(() => {
      setWaveMsg(null);
      waveRef.current = next;
      setWave(next);
    }, 2600);
  }, [saveScore]);

  const startGame = () => {
    clearTimeout(killTimer.current);
    clearTimeout(waveTimer.current);
    scoreRef.current = 0; waveRef.current = 1;
    setScore(0); setWave(1);
    setKillMsg(null);
    setWaveMsg(WAVES[0].msg);
    setGameKey(k => k + 1);
    setGameState('playing');
    waveTimer.current = setTimeout(() => setWaveMsg(null), 2200);
  };

  return (
    <div className="sg-overlay">
      <div className="sg-header">
        <button className="sg-close" onClick={onClose}>← Fechar</button>
        <div className="sg-hud">
          {gameState === 'playing' && <span className="sg-wave-label">Wave {wave}/10</span>}
          <span className="sg-score-label">Score: {score}</span>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <GameScene
          key={gameKey}
          wave={wave}
          playing={gameState === 'playing'}
          onScore={handleScore}
          onKill={handleKill}
          onGameOver={handleGameOver}
          onWaveClear={handleWaveClear}
          touchRef={touchRef}
          modelsRef={modelsRef}
        />
      </Canvas>

      {killMsg && <div className="sg-kill-msg">{killMsg}</div>}
      {waveMsg && <div className="sg-wave-msg">{waveMsg}</div>}

      {gameState !== 'playing' && (
        <div className="sg-modal">
          {gameState === 'menu' && (
            <>
              <h2 className="sg-title">DEBUG.EXE</h2>
              <p className="sg-subtitle">
                O codebase está sob ataque de bugs reais.<br />
                Elimine-os antes que cheguem à produção.
              </p>
              <div className="sg-controls-hint">
                <span>← → Mover</span>
                <span>ESPAÇO Atirar</span>
              </div>
              {highScores.length > 0 && (
                <div className="sg-scores">
                  <p className="sg-scores__title">Top Scores</p>
                  {highScores.map((s, i) => (
                    <span key={i} className="sg-scores__entry">#{i + 1} — {s} pts</span>
                  ))}
                </div>
              )}
              <button className="sg-btn" onClick={startGame} disabled={isLoading}>
                {isLoading ? 'Carregando modelos...' : 'Iniciar Debug'}
              </button>
            </>
          )}
          {gameState === 'gameover' && (
            <>
              <h2 className="sg-title sg-title--error">BUILD FAILED</h2>
              <p className="sg-subtitle">Os bugs chegaram à produção.<br />Score: {score} pts</p>
              <button className="sg-btn" onClick={startGame}>Retentar</button>
              <button className="sg-btn sg-btn--ghost" onClick={() => setGameState('menu')}>Menu</button>
            </>
          )}
          {gameState === 'victory' && (
            <>
              <h2 className="sg-title sg-title--victory">DEPLOY CONCLUÍDO</h2>
              <p className="sg-subtitle">
                feat: eliminated {score} pts worth of bugs<br />
                Production is stable. 🚀
              </p>
              <button className="sg-btn" onClick={startGame}>Novo Debug</button>
              <button className="sg-btn sg-btn--ghost" onClick={() => setGameState('menu')}>Menu</button>
            </>
          )}
        </div>
      )}

      {gameState === 'playing' && (
        <div className="sg-touch">
          <div className="sg-touch__dirs">
            <button className="sg-touch__btn"
              onPointerDown={() => (touchRef.current.left = true)}
              onPointerUp={() => (touchRef.current.left = false)}
              onPointerLeave={() => (touchRef.current.left = false)}>←</button>
            <button className="sg-touch__btn"
              onPointerDown={() => (touchRef.current.right = true)}
              onPointerUp={() => (touchRef.current.right = false)}
              onPointerLeave={() => (touchRef.current.right = false)}>→</button>
          </div>
          <button className="sg-touch__shoot"
            onPointerDown={() => (touchRef.current.shoot = true)}
            onPointerUp={() => (touchRef.current.shoot = false)}
            onPointerLeave={() => (touchRef.current.shoot = false)}>FIRE</button>
        </div>
      )}
    </div>
  );
}
