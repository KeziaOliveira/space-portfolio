import { about } from '../../data/content';
import './About.css';

export default function About() {
  return (
    <section id="sobre" className="section about" aria-label="Sobre mim">
      <div className="section__container">
        <span className="section__label">Sobre</span>
        <h2 className="section__title">Quem é Kezia</h2>

        <div className="about__content">
          <div className="about__text">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="about__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about__aside" aria-hidden="true">
            <div className="about__orbit">
              <div className="about__planet"></div>
              <div className="about__ring"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
