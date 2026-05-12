import React, { useState } from 'react';
import { experience } from '../../data/content';
import './Experience.css';

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experiencia" className="section experience" aria-label="Experiência Profissional">
      <div className="section__container">
        <span className="section__label">Trajetória</span>
        <h2 className="section__title">Experiência Profissional</h2>
        
        <div className="experience__horizontal-timeline">
          <div className="experience__line" aria-hidden="true"></div>
          
          <div className="experience__cards">
            {experience.map((item, index) => {
              const isActive = activeIndex === index;
              
              return (
                <div 
                  key={index} 
                  className={`experience__card-wrapper ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="experience__node-point">
                    <div className="experience__node-inner"></div>
                  </div>

                  <div className="experience__card">
                    <div className="experience__card-content">
                      <span className="experience__period">{item.period}</span>
                      <h3 className="experience__role">{item.role}</h3>
                      <span className="experience__company">{item.company}</span>
                      <p className="experience__description">{item.description}</p>
                    </div>

                    {isActive && item.videoUrl && (
                      <div className="experience__card-expanded">
                        <div className="experience__video-container">
                          <video 
                            src={new URL(item.videoUrl, import.meta.url).href} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="experience__video"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
