import { personal } from '../../data/content';
import Button from '../../components/Button/Button';
import './Hero.css';

export default function Hero({ onExplore }) {
  return (
    <section id="hero" className="hero" aria-label="Apresentação">

      {/* Starfield background 2D (Fallback para mobile) */}
      <div className="hero__stars" aria-hidden="true"></div>
      <div className="hero__stars hero__stars--medium" aria-hidden="true"></div>
      <div className="hero__stars hero__stars--large" aria-hidden="true"></div>

      <div className="hero__container">
        <span className="hero__badge">👩‍🚀 {personal.role}</span>

        <h1 className="hero__name">{personal.name}</h1>

        <p className="hero__headline">{personal.headline}</p>

        <p className="hero__subheadline">{personal.subheadline}</p>

        <div className="hero__actions" style={{ pointerEvents: 'auto' }}>
          <Button variant="primary" href="#sobre" icon="🚀">
            Iniciar missão
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={(e) => {
              console.log("Botão Explorar clicado!");
              onExplore();
            }} 
            icon="🛸"
            style={{ borderColor: '#8b5cf6', color: '#a78bfa', zIndex: 9999, position: 'relative' }}
          >
            Explorar universo
          </Button>

          <Button variant="ghost" href={personal.resumeUrl} download icon="📄">
            Baixar currículo
          </Button>
        </div>

        {/* Dica visual de interatividade do planeta 3D */}
        <div className="hero__hint" style={{ pointerEvents: 'auto' }}>
          <span className="hero__hint-icon" aria-hidden="true">✦</span>
          <span>Clique no planeta para explorar</span>
        </div>
      </div>
    </section>
  );
}
