import { social, personal } from '../../data/content';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo-icon">✦</span>
          <span>{personal.name}</span>
        </div>

        <div className="footer__links">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer__link"
          >
            LinkedIn
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer__link"
          >
            GitHub
          </a>
          <a
            href={`mailto:${social.email}`}
            aria-label="E-mail"
            className="footer__link"
          >
            E-mail
          </a>
        </div>

        <p className="footer__copy">
          © {currentYear} {personal.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
