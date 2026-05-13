import { useEffect, useState, useRef } from 'react';
import { about } from '../../data/content';
import './About.css';

export default function About() {
  return (
    <section id="sobre" className="section about" aria-label="Sobre mim">
      <div className="section__container">
        <div className="about__content">
          <span className="section__label">Sobre</span>
          <h2 className="section__title">Quem é Kezia</h2>
          <div className="about__text">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="about__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about__stats">
            <div className="stat__item">
              <span className="stat__number">
                <Counter end={42} suffix="+" />
              </span>
              <span className="stat__label">projetos desenvolvidos</span>
            </div>
            <div className="stat__item">
              <span className="stat__number">
                <Counter end={8} suffix="+" />
              </span>
              <span className="stat__label">anos de experiência</span>
            </div>
            <div className="stat__item">
              <span className="stat__number">
                <Counter end={60} suffix="+" />
              </span>
              <span className="stat__label">clientes atendidos</span>
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

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

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}
