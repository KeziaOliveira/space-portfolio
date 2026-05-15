import React, { useState, useEffect, useRef } from 'react';
import { experience } from '../../data/content';
import TechCarousel from './TechCarousel';
import './Experience.css';

function ExperienceItem({ item, index, isActive, onSelect }) {
  const itemRef = useRef(null);

  return (
    <div 
      ref={itemRef}
      className={`experience__item ${isActive ? 'is-active' : ''}`}
      id={`experience-${index}`}
    >
      {/* Header da Linha - 3 Colunas */}
      <div 
        className="experience__header"
        onClick={() => onSelect(index)}
      >
        <div className="experience__col experience__col--company">
          <span className="experience__company-name">{item.company}</span>
        </div>
        <div className="experience__col experience__col--period">
          <span className="experience__year">{item.period}</span>
        </div>
        <div className="experience__col experience__col--role">
          <span className="experience__role-title">{item.role}</span>
        </div>
      </div>

      {/* Conteúdo Expandido */}
      <div className="experience__expandable">
        <div className="experience__inner-content">
          <div className="experience__grid">
            <div className="experience__text-side">
              <p className="experience__full-description">{item.description}</p>
              
              <div className="experience__achievements">
                <h5>Impacto e Resultados</h5>
                <ul>
                  <li>Arquitetura de sistemas escaláveis</li>
                  <li>Liderança técnica e mentoria</li>
                  <li>Otimização de fluxos de CI/CD</li>
                  <li>Design Systems modernos</li>
                </ul>
              </div>
            </div>
            
            <div className="experience__media-side">
              {item.videoUrl ? (
                <div className="experience__video-wrapper">
                  <video 
                    src={new URL(item.videoUrl, import.meta.url).href} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="experience__media-video"
                  />
                </div>
              ) : (
                <div className="experience__media-placeholder">
                  <span>Mídia indisponível</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const items = containerRef.current.querySelectorAll('.experience__item');
      const viewportCenter = window.innerHeight / 2;
      
      let closestIdx = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        // Calculamos a distância do centro do header do item até o centro do viewport
        const itemHeaderCenter = rect.top + 40; // 40px é aprox metade da altura do header colapsado
        const distance = Math.abs(viewportCenter - itemHeaderCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = index;
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener('scroll', handleScroll);
    // Executa uma vez no mount para definir o estado inicial
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleManualSelect = (index) => {
    setActiveIdx(index);
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="experiencia" className="section experience" aria-label="Experiência Profissional">
      <div className="experience__tech-wrapper">
        <TechCarousel />
      </div>
      <div className="experience__container">
        <div className="experience__intro">
          <span className="section__label">Trajetória</span>
          <h2 className="section__title">Experiência Profissional</h2>
          <p className="section__subtitle">
            Uma jornada focada em criar experiências digitais memoráveis e soluções técnicas robustas.
          </p>
        </div>
        
        <div className="experience__list" ref={containerRef}>
          {experience.map((item, index) => (
            <ExperienceItem 
              key={index} 
              item={item} 
              index={index} 
              isActive={activeIdx === index} 
              onSelect={handleManualSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
