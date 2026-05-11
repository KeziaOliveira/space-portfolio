import { experience } from '../../data/content';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experiencia" className="section experience" aria-label="Experiência Profissional">
      <div className="section__container">
        <span className="section__label">Trajetória</span>
        <h2 className="section__title">Experiência Profissional</h2>
        <p className="section__subtitle">
          Minha jornada no desenvolvimento, focada em criar impacto e evoluir tecnicamente.
        </p>

        <div className="experience__timeline">
          {experience.map((item, index) => (
            <div key={index} className="experience__item">
              <div className="experience__dot"></div>
              <div className="experience__card">
                <div className="experience__header">
                  <div className="experience__title">
                    <h3>{item.role}</h3>
                    <span className="experience__company">{item.company}</span>
                  </div>
                  <span className="experience__period">{item.period}</span>
                </div>
                <p className="experience__description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
