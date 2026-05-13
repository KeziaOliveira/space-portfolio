import React from 'react';
import './TechCarousel.css';

const technologies = [
  { name: 'React', icon: 'react-brands-solid-full.svg' },
  { name: 'TypeScript', icon: 'typescript-brands-solid-full.svg' },
  { name: 'Node.js', icon: 'node-brands-solid-full.svg' },
  { name: 'Angular', icon: 'angular-brands-solid-full.svg' },
  { name: 'JavaScript', icon: 'square-js-brands-solid-full.svg' },
  { name: 'Python', icon: 'python-brands-solid-full.svg' },
  { name: 'HTML5', icon: 'html5-brands-solid-full.svg' },
  { name: 'CSS3', icon: 'css3-alt-brands-solid-full.svg' },
  { name: 'Figma', icon: 'square-figma-brands-solid-full.svg' },
  { name: 'GitHub', icon: 'github-brands-solid-full.svg' },
];

export default function TechCarousel() {
  const doubleTechs = [...technologies, ...technologies];

  return (
    <div className="tech-carousel">
      <div className="tech-carousel__inner">
        <div className="tech-carousel__marquee">
          <div className="tech-carousel__track">
            {doubleTechs.map((tech, index) => (
              <div key={index} className="tech-carousel__item">
                <div className="tech-carousel__icon-wrapper">
                  <img 
                    src={`/src/assets/icons/tech/${tech.icon}`} 
                    alt={tech.name} 
                    className="tech-carousel__icon"
                  />
                </div>
                <span className="tech-carousel__tooltip">{tech.name}</span>
              </div>
            ))}
          </div>
          <div className="tech-carousel__fade tech-carousel__fade--left"></div>
          <div className="tech-carousel__fade tech-carousel__fade--right"></div>
        </div>
      </div>
    </div>
  );
}
