import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedHeading, AnimatedBlock } from '../../components/AnimatedText/AnimatedText';
import './About.css';

export default function About() {
  const { t } = useLanguage();
  const { label, title, stats } = t.ui.about;
  const { paragraphs } = t.about;

  return (
    <section id="sobre" className="section about" aria-label="Sobre mim">
      <div className="section__container">
        <div className="about__content">
          <AnimatedBlock as="span" className="section__label">{label}</AnimatedBlock>
          <AnimatedHeading className="section__title">{title}</AnimatedHeading>
          <div className="about__body">
            <div className="about__text">
              {paragraphs.map((paragraph, index) => (
                <AnimatedBlock key={index} as="p" className="about__paragraph" index={index}>
                  {paragraph}
                </AnimatedBlock>
              ))}
            </div>

            <div className="about__stats">
              <div className="stat__item">
                <span className="stat__number"><Counter end={42} suffix="+" /></span>
                <span className="stat__label">{stats.projects}</span>
              </div>
              <div className="stat__item">
                <span className="stat__number"><Counter end={8} suffix="+" /></span>
                <span className="stat__label">{stats.years}</span>
              </div>
              <div className="stat__item">
                <span className="stat__number"><Counter end={60} suffix="+" /></span>
                <span className="stat__label">{stats.clients}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let animationFrame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
      else setCount(end);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}
