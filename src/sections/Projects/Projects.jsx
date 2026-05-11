import { projects } from '../../data/content';
import Card from '../../components/Card/Card';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projetos" className="section projects" aria-label="Projetos">
      <div className="section__container">
        <span className="section__label">Projetos selecionados</span>
        <h2 className="section__title">O que eu já construí</h2>
        <p className="section__subtitle">
          Projetos reais onde resolvi problemas, tomei decisões técnicas e entreguei resultado.
        </p>

        <div className="projects__grid">
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
