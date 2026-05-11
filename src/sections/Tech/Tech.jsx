import { skills } from '../../data/content';
import './Tech.css';

export default function Tech() {
  const categories = Object.values(skills);

  return (
    <section id="tecnologias" className="section tech" aria-label="Tecnologias">
      <div className="section__container">
        <span className="section__label">Stack</span>
        <h2 className="section__title">Ferramentas que utilizo</h2>
        <p className="section__subtitle">
          Tecnologias com as quais trabalho no dia a dia e em projetos pessoais.
        </p>

        <div className="tech__categories">
          {categories.map((category) => (
            <div key={category.label} className="tech__category">
              <h3 className="tech__category-title">{category.label}</h3>
              <div className="tech__grid">
                {category.items.map((skill) => (
                  <div key={skill.name} className="tech__item">
                    <span className="tech__icon" aria-hidden="true">
                      {skill.icon}
                    </span>
                    <span className="tech__name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
