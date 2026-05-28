import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import './SpaceGame.css';

const MAX_LASERS = 30;
const BOUNDARY_X = 10;
const ENEMY_START_Y = 6;
const ENEMY_SPACING_X = 2;
const ENEMY_SPACING_Y = 1.5;

const LEVEL_CONFIG = {
  1: { rows: 3, cols: 5, speedX: 1.0, speedY: 0.15, label: 'Fácil' },
  2: { rows: 4, cols: 7, speedX: 2.0, speedY: 0.2, label: 'Médio' },
  3: { rows: 5, cols: 8, speedX: 3.5, speedY: 0.3, label: 'Difícil' }
};
const MAX_ENEMIES = 5 * 8; // Máximo possível de inimigos (Nível 3)

function GameScene({ level, setScore, setGameState }) {
  const playerRef = useRef();
  const enemiesRef = useRef([]);
  const lasersRef = useRef([]);
  
  const keys = useRef({ ArrowLeft: false, ArrowRight: false, ' ': false });
  const config = LEVEL_CONFIG[level];

  const gameData = useRef({
    lastShotTime: 0,
    enemyDirection: 1,
    enemySpeedX: config.speedX,
    enemySpeedY: config.speedY,
    enemiesActive: config.rows * config.cols
  });

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keys.current.hasOwnProperty(e.key)) keys.current[e.key] = true;
    };
    const handleKeyUp = (e) => {
      if (keys.current.hasOwnProperty(e.key)) keys.current[e.key] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Initialize positions based on level
  useEffect(() => {
    const data = gameData.current;
    data.enemySpeedX = config.speedX;
    data.enemySpeedY = config.speedY;
    data.enemiesActive = config.rows * config.cols;
    data.enemyDirection = 1;

    let index = 0;
    const startX = -((config.cols - 1) * ENEMY_SPACING_X) / 2;
    
    // Posiciona os inimigos ativos
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        const mesh = enemiesRef.current[index];
        if (mesh) {
          mesh.position.set(startX + c * ENEMY_SPACING_X, ENEMY_START_Y - r * ENEMY_SPACING_Y, 0);
          mesh.userData = { active: true, isEnemy: true };
          mesh.visible = true;
        }
        index++;
      }
    }
    
    // Esconde o restante das instâncias (pré-alocadas mas não usadas neste nível)
    for (let i = index; i < MAX_ENEMIES; i++) {
      const mesh = enemiesRef.current[i];
      if (mesh) {
        mesh.visible = false;
        mesh.userData = { active: false };
      }
    }
    
    lasersRef.current.forEach(laser => {
      if (laser) {
        laser.visible = false;
        laser.userData = { active: false };
      }
    });
    
    if (playerRef.current) {
      playerRef.current.position.set(0, -5, 0);
    }
  }, [level, config]);

  useFrame((state, delta) => {
    const data = gameData.current;
    
    // Player Movement
    if (playerRef.current) {
      if (keys.current.ArrowLeft && playerRef.current.position.x > -BOUNDARY_X) {
        playerRef.current.position.x -= 15 * delta;
      }
      if (keys.current.ArrowRight && playerRef.current.position.x < BOUNDARY_X) {
        playerRef.current.position.x += 15 * delta;
      }
    }

    // Shooting
    if (keys.current[' '] && state.clock.elapsedTime - data.lastShotTime > 0.3) {
      data.lastShotTime = state.clock.elapsedTime;
      const laser = lasersRef.current.find(l => l && !l.userData.active);
      if (laser && playerRef.current) {
        laser.position.copy(playerRef.current.position);
        laser.position.y += 1;
        laser.userData.active = true;
        laser.visible = true;
      }
    }

    // Lasers update
    lasersRef.current.forEach(laser => {
      if (laser && laser.userData.active) {
        laser.position.y += 20 * delta;
        if (laser.position.y > 10) {
          laser.userData.active = false;
          laser.visible = false;
        }
      }
    });

    // Enemies update
    let hitWall = false;
    enemiesRef.current.forEach(enemy => {
      if (enemy && enemy.userData.active) {
        enemy.position.x += data.enemySpeedX * data.enemyDirection * delta;
        if (enemy.position.x > BOUNDARY_X || enemy.position.x < -BOUNDARY_X) {
          hitWall = true;
        }
      }
    });

    if (hitWall) {
      data.enemyDirection *= -1;
      enemiesRef.current.forEach(enemy => {
        if (enemy && enemy.userData.active) {
          enemy.position.y -= data.enemySpeedY * 5; // move down when hitting wall
          enemy.position.x += data.enemySpeedX * data.enemyDirection * delta; // adjust so it doesn't get stuck
          
          if (enemy.position.y < -4) {
            setGameState('gameover');
          }
        }
      });
    }

    // Collisions
    lasersRef.current.forEach(laser => {
      if (!laser || !laser.userData.active) return;
      
      enemiesRef.current.forEach(enemy => {
        if (!enemy || !enemy.userData.active) return;
        
        // Simple AABB (distance check)
        const dx = laser.position.x - enemy.position.x;
        const dy = laser.position.y - enemy.position.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 0.8) {
          enemy.userData.active = false;
          enemy.visible = false;
          laser.userData.active = false;
          laser.visible = false;
          
          setScore(prev => prev + 10);
          data.enemiesActive--;
          
          data.enemySpeedX += 0.05; // speed up slightly when enemy destroyed
          
          if (data.enemiesActive <= 0) {
            setGameState('level_complete');
          }
        }
      });
    });
  });

  return (
    <group>
      {/* Player */}
      <mesh ref={playerRef}>
        <coneGeometry args={[0.5, 1, 8]} />
        <meshStandardMaterial color="#3b82f6" emissive="#2563eb" emissiveIntensity={0.5} />
      </mesh>

      {/* Enemies */}
      {Array(MAX_ENEMIES).fill().map((_, i) => (
        <mesh key={`enemy-${i}`} ref={el => (enemiesRef.current[i] = el)} visible={false}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Lasers */}
      {Array(MAX_LASERS).fill().map((_, i) => (
        <mesh key={`laser-${i}`} ref={el => (lasersRef.current[i] = el)} visible={false}>
          <cylinderGeometry args={[0.05, 0.05, 0.5]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}
    </group>
  );
}

export default function SpaceGame({ onClose }) {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameover, level_complete, victory
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1); // Começa no fácil por padrão

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, []);

  useEffect(() => {
    if (gameState === 'level_complete' && level >= 3) {
      setGameState('victory');
    }
  }, [gameState, level]);

  const startGame = () => {
    setLevel(1);
    setScore(0);
    setGameState('playing');
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setGameState('playing');
  };

  return (
    <div className="space-game-overlay">
      <div className="space-game__header">
        <button className="space-game__close-btn" onClick={onClose}>
          ⬅ Fechar
        </button>
        <div className="space-game__score">
          Nível {level} | Score: {score}
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
          
          {gameState === 'playing' && (
            <GameScene level={level} setScore={setScore} setGameState={setGameState} />
          )}
        </Suspense>
      </Canvas>

      {gameState !== 'playing' && (
        <div className="space-game__ui">
          {gameState === 'menu' && (
            <>
              <h2>Space Invaders</h2>
              <p>Use as setas ⬅ ➡ para mover e ESPAÇO para atirar.</p>
              <button className="space-game__btn" onClick={startGame}>Começar Jogo</button>
            </>
          )}
          {gameState === 'gameover' && (
            <>
              <h2>Game Over</h2>
              <p>O nível {LEVEL_CONFIG[level].label} te venceu. Pontuação: {score}</p>
              <button className="space-game__btn" onClick={() => setGameState('menu')}>Voltar ao Menu</button>
            </>
          )}
          {gameState === 'level_complete' && level < 3 && (
            <>
              <h2>Nível {level} Concluído!</h2>
              <p>Ótimo trabalho! Pontuação atual: {score}</p>
              <button className="space-game__btn" onClick={nextLevel}>Ir para o Nível {level + 1}</button>
            </>
          )}
          {gameState === 'victory' && (
            <>
              <h2>Vitória Total!</h2>
              <p>Você destruiu todos os invasores no nível Difícil. Pontuação final: {score}</p>
              <button className="space-game__btn" onClick={() => setGameState('menu')}>Jogar Novamente</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
