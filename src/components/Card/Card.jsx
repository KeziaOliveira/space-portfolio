import './Card.css';
import Button from '../Button/Button';

export default function Card({ title, description, tags, liveUrl, githubUrl }) {
  return (
    <article className="card">
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        <div className="card__tags">
          {tags.map((tag) => (
            <span key={tag} className="card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="card__footer">
        {liveUrl && (
          <Button variant="primary" href={liveUrl} icon="🔗">
            Ver projeto
          </Button>
        )}
        {githubUrl && (
          <Button variant="ghost" href={githubUrl} icon="📂">
            GitHub
          </Button>
        )}
      </div>
    </article>
  );
}
