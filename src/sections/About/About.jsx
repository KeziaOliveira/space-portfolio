import { about, skills } from '../../data/content';
import './About.css';

export default function About() {
  const categories = Object.values(skills);

  return (
    <section id="sobre" className="section about" aria-label="Sobre mim">
      <div className="section__container">
        <div className="about__grid">
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
          </div>

          <div className="about__skills">
            <span className="section__label">Expertise</span>
            <div className="skills__categories">
              {categories.map((category) => (
                <div key={category.label} className="skills__category">
                  <h3 className="skills__category-title">{category.label}</h3>
                  <div className="skills__list">
                    {category.items.map((skill) => (
                      <div key={skill.name} className="skills__item">
                        <span className="skills__icon">{skill.icon}</span>
                        <span className="skills__name">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
