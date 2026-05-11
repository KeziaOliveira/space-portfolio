import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import Tech from './sections/Tech/Tech';
import Contact from './sections/Contact/Contact';
import Scene3D from './components/Scene3D/Scene3D';
import ExploreMode from './components/ExploreMode/ExploreMode';
import './App.css';

export default function App() {
  const [isExploreMode, setIsExploreMode] = useState(false);

  console.log("App renderizado. isExploreMode:", isExploreMode);

  return (
    <>
      {/* O modo exploração fica por cima de tudo quando ativado */}
      {isExploreMode && <ExploreMode onClose={() => setIsExploreMode(false)} />}
      
      <Scene3D />
      <a href="#sobre" className="skip-to-content">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="main-content">
        <Hero onExplore={() => setIsExploreMode(true)} />
        <About />
        <Projects />
        <Tech />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
