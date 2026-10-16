import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedBlock } from '../../components/AnimatedText/AnimatedText';
import SpaceshipButtonIcon from './SpaceshipButtonIcon';
import './Hero.css';

export default function Hero({ onExplore }) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      onExplore();
      setTimeout(() => setIsLaunching(false), 500);
    }, 1200);
  };

  return (
    <section
      id="hero"
      className={`hero ${isLaunching ? 'hero--launching' : ''}`}
      aria-label="Apresentação"
    >
      <div className="hero__container">
        <div className="hero__bottom-left">
          <AnimatedBlock as="p" className="hero__description">
            {t.ui.hero.description}<br />
            {t.ui.hero.subheadline}
          </AnimatedBlock>

          <h1 className="hero__title">
            <motion.span
              className="hero__name-top"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              KEZIA
            </motion.span>
            <motion.span
              className="hero__name-bottom"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              OLIVEIRA
            </motion.span>
          </h1>
        </div>

        <div className="hero__right">
          <button
            className={`explore-button ${isHovered ? 'is-hovered' : ''} ${isLaunching ? 'is-launching' : ''}`}
            onClick={handleLaunch}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Ativar Modo Exploração"
            disabled={isLaunching}
          >
            <div className="explore-button__circle-wrapper">
              <svg className="explore-button__svg" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                  />
                </defs>
                <text className="explore-button__text-path">
                  <textPath xlinkHref="#circlePath" startOffset="0%">
                    {t.ui.hero.exploreButtonRing}
                  </textPath>
                </text>
              </svg>
              <div className="explore-button__icon-container">
                <SpaceshipButtonIcon isHovered={isHovered} isLaunching={isLaunching} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
