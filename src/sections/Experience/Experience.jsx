import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedHeading, AnimatedBlock } from '../../components/AnimatedText/AnimatedText';
import TechCarousel from './TechCarousel';
import './Experience.css';
import sfeVideo from '../../assets/videos/experience_videos/SFE_video.mp4';
import escolaVideo from '../../assets/videos/experience_videos/Escolaweb_video.mp4';
import ecommerceVideo from '../../assets/videos/experience_videos/ecommerce-recording.mp4';

const EXPERIENCE_VIDEOS = [sfeVideo, escolaVideo, ecommerceVideo];

function ExperienceItem({ item, index, isActive, onSelect }) {
  const itemRef = useRef(null);

  return (
    <div
      ref={itemRef}
      className={`experience__item ${isActive ? 'is-active' : ''}`}
      id={`experience-${index}`}
    >
      <div className="experience__header" onClick={() => onSelect(index)}>
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

      <div className="experience__expandable">
        <div className="experience__inner-content">
          <div className="experience__grid">
            <div className="experience__text-side">
              <p className="experience__full-description">{item.description}</p>
              {item.subDescription && (
                <ul className="experience__bullet-list">
                  {item.subDescription.map((paragraph, pIndex) => (
                    <li key={pIndex} className="experience__sub-description">
                      {paragraph}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="experience__media-side">
              {EXPERIENCE_VIDEOS[index] ? (
                <div className="experience__video-wrapper">
                  <video
                    src={EXPERIENCE_VIDEOS[index]}
                    autoPlay loop muted playsInline
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
  const { t } = useLanguage();
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
        const distance = Math.abs(viewportCenter - (rect.top + 40));
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = index;
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleManualSelect = (index) => {
    setActiveIdx(index);
    const element = document.getElementById(`experience-${index}`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="experiencia" className="section experience" aria-label="Experiência Profissional">
      <div className="experience__tech-wrapper">
        <TechCarousel />
      </div>
      <div className="experience__container">
        <div className="experience__intro">
          <AnimatedHeading className="section__title">{t.ui.experience.title}</AnimatedHeading>
          <AnimatedBlock as="p" className="section__subtitle" index={1}>
            {t.ui.experience.subtitle}
          </AnimatedBlock>
        </div>

        <div className="experience__list" ref={containerRef}>
          {t.experience.map((item, index) => (
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
