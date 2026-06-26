import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
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

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

function MainContent({ onExplore, onOpenGame }) {
  const { lang } = useLanguage();
  return (
    <main id="main-content">
      <Hero onExplore={onExplore} />
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <About />
          <Experience />
          <Projects />
          <Contact />
          {/* SPACE INVADERS BUTTON — temporariamente desativado
          <div style={{ textAlign: 'center', padding: '4rem 0 2rem', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
            <button
              onClick={onOpenGame}
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
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default function App() {
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [isSpaceGameOpen, setIsSpaceGameOpen] = useState(false);

  return (
    <LanguageProvider>
      {/* O modo exploração fica por cima de tudo quando ativado */}
      {isExploreMode && <ExploreMode onClose={() => setIsExploreMode(false)} onOpenGame={() => { setIsExploreMode(false); setIsSpaceGameOpen(true); }} />}
      
      {/* Jogo em 3D */}
      {isSpaceGameOpen && <SpaceGame onClose={() => setIsSpaceGameOpen(false)} />}
      
      <Scene3D />
      <a href="#sobre" className="skip-to-content">
        Pular para o conteúdo
      </a>

      <Header />

      <MainContent
        onExplore={() => setIsExploreMode(true)}
        onOpenGame={() => setIsSpaceGameOpen(true)}
      />

      <Footer />
    </LanguageProvider>
  );
}
