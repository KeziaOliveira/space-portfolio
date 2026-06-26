import { useLanguage } from '../../context/LanguageContext';
import { AnimatedHeading, AnimatedBlock } from '../../components/AnimatedText/AnimatedText';
import './Contact.css';
import EmailIcon from '../../assets/icons-contact/envelope-solid-full (2).svg';
import GithubIcon from '../../assets/icons-contact/square-github-brands-solid-full.svg';
import LinkedinIcon from '../../assets/icons-contact/square-linkedin-brands-solid-full (1).svg';

export default function Contact() {
  const { t } = useLanguage();
  const { title, subtitle } = t.ui.contact;

  return (
    <section id="contato" className="section contact" aria-label="Contact">
      <div className="section__container contact__container">
        <AnimatedHeading
          className="section__title"
          as="h2"
          style={{ textAlign: 'left', width: '100%' }}
        >
          {title}
        </AnimatedHeading>
        <AnimatedBlock as="p" className="contact__subtitle" index={1} style={{ textAlign: 'left', width: '100%', color: '#94a3b8', fontSize: '1.25rem', marginBottom: 'var(--space-16)' }}>
          {subtitle}
        </AnimatedBlock>

        <AnimatedBlock index={2} className="contact__links">
          <a href="https://www.linkedin.com/in/kezia-oliveira-dev" target="_blank" rel="noopener noreferrer" className="contact__icon-link" aria-label="LinkedIn">
            <img src={LinkedinIcon} alt="LinkedIn" className="contact__icon-img" />
          </a>
          <a href="https://github.com/keziaoliveira" target="_blank" rel="noopener noreferrer" className="contact__icon-link" aria-label="GitHub">
            <img src={GithubIcon} alt="GitHub" className="contact__icon-img" />
          </a>
          <a href="mailto:kezia2709@gmail.com" className="contact__icon-link" aria-label="Email">
            <img src={EmailIcon} alt="Email" className="contact__icon-img" />
          </a>
        </AnimatedBlock>
      </div>
    </section>
  );
}
