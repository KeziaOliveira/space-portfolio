import { useState } from 'react';
import SpaceshipButtonIcon from './SpaceshipButtonIcon';
import './Hero.css';

export default function Hero({ onExplore }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    // Pequeno atraso para a animação da nave decolando antes de mudar de cena
    setTimeout(() => {
      onExplore();
      // Resetamos o estado de lançamento para que o Hero esteja visível ao voltar
      setTimeout(() => setIsLaunching(false), 500);
    }, 1200);
  };

  return (
    <section 
      id="hero" 
      className={`hero ${isLaunching ? 'hero--launching' : ''}`} 
      aria-label="Apresentação"
    >
      {/* Starfield background 2D (Fallback para mobile/perf) */}
      <div className="hero__stars" aria-hidden="true"></div>
      <div className="hero__stars hero__stars--medium" aria-hidden="true"></div>
      <div className="hero__stars hero__stars--large" aria-hidden="true"></div>

      <div className="hero__container">
        <div className="hero__bottom-left">
          <p className="hero__description">
            Desenvolvedora em construção de universos digitais<br />
            Focada em interfaces que resolvem problemas reais — com código limpo, atenção ao detalhe e vontade de evoluir a cada projeto.
          </p>
          
          <h1 className="hero__title">
            <span className="hero__name-top">KEZIA</span>
            <span className="hero__name-bottom">OLIVEIRA</span>
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
                    NAVEGAR EM MODO EXPLORAÇÃO • NAVEGAR EM MODO EXPLORAÇÃO •
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



