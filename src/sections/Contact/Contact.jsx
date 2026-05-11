import { social } from '../../data/content';
import Button from '../../components/Button/Button';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contato" className="section contact" aria-label="Contato">
      <div className="section__container contact__container">
        <span className="section__label">Próximo passo</span>
        <h2 className="section__title">Vamos construir algo juntos?</h2>
        <p className="section__subtitle">
          Se algo do que viu aqui fez sentido, me chama. Estou aberta a oportunidades, freelas e boas conversas.
        </p>

        <div className="contact__links">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card"
            aria-label="LinkedIn"
          >
            <span className="contact__card-icon">💼</span>
            <span className="contact__card-label">LinkedIn</span>
            <span className="contact__card-value">Conectar</span>
          </a>

          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card"
            aria-label="GitHub"
          >
            <span className="contact__card-icon">📂</span>
            <span className="contact__card-label">GitHub</span>
            <span className="contact__card-value">Ver código</span>
          </a>

          <a
            href={`mailto:${social.email}`}
            className="contact__card"
            aria-label="Enviar e-mail"
          >
            <span className="contact__card-icon">✉️</span>
            <span className="contact__card-label">E-mail</span>
            <span className="contact__card-value">{social.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
