import React from 'react';
import './TechCarousel.css';
import reactIcon from '../../assets/icons/tech/react-brands-solid-full.svg';
import typescriptIcon from '../../assets/icons/tech/typescript-brands-solid-full.svg';
import nodeIcon from '../../assets/icons/tech/node-brands-solid-full.svg';
import angularIcon from '../../assets/icons/tech/angular-brands-solid-full.svg';
import javascriptIcon from '../../assets/icons/tech/square-js-brands-solid-full.svg';
import pythonIcon from '../../assets/icons/tech/python-brands-solid-full.svg';
import html5Icon from '../../assets/icons/tech/html5-brands-solid-full.svg';
import css3Icon from '../../assets/icons/tech/css3-alt-brands-solid-full.svg';
import figmaIcon from '../../assets/icons/tech/square-figma-brands-solid-full.svg';
import githubIcon from '../../assets/icons/tech/github-brands-solid-full.svg';

const technologies = [
  { name: 'React', icon: reactIcon },
  { name: 'TypeScript', icon: typescriptIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'Angular', icon: angularIcon },
  { name: 'JavaScript', icon: javascriptIcon },
  { name: 'Python', icon: pythonIcon },
  { name: 'HTML5', icon: html5Icon },
  { name: 'CSS3', icon: css3Icon },
  { name: 'Figma', icon: figmaIcon },
  { name: 'GitHub', icon: githubIcon },
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
                    src={tech.icon}
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
