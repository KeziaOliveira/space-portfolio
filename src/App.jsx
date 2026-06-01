import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';
import Scene3D from './components/Scene3D/Scene3D';
import ExploreMode from './components/ExploreMode/ExploreMode';
import SpaceGame from './components/SpaceGame/SpaceGame';
import './App.css';

export default function App() {
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [isSpaceGameOpen, setIsSpaceGameOpen] = useState(false);

  return (
    <>
      {/* O modo exploração fica por cima de tudo quando ativado */}
      {isExploreMode && <ExploreMode onClose={() => setIsExploreMode(false)} />}
      
      {/* Jogo em 3D */}
      {isSpaceGameOpen && <SpaceGame onClose={() => setIsSpaceGameOpen(false)} />}
      
      <Scene3D />
      <a href="#sobre" className="skip-to-content">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="main-content">
        <Hero onExplore={() => setIsExploreMode(true)} />
        <About />
        <Experience />
        <Projects />

        <Contact />

        {/* 
        <div style={{ textAlign: 'center', padding: '4rem 0 2rem', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
          <button 
            onClick={() => setIsSpaceGameOpen(true)}
            style={{
              background: 'transparent',
              color: '#3b82f6',
              border: '1px solid #3b82f6',
              padding: '0.75rem 2rem',
              borderRadius: '2rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              fontFamily: '"Inter", sans-serif'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🎮 Jogar Space Invaders
          </button>
        </div>
        */}
      </main>

      <Footer />
    </>
  );
}
