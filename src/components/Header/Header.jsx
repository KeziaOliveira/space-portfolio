import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

const navItems = [
  { key: 'about', href: '#sobre' },
  { key: 'experience', href: '#experiencia' },
  { key: 'projects', href: '#projetos' },
  { key: 'contact', href: '#contato' },
];

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      const sections = navItems.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`header ${(scrolled || menuOpen) ? 'header--scrolled' : ''}`}
      role="banner"
    >
      <div className="header__container">
        <a href="#" className="header__logo" aria-label="Ir para o topo">
          <span className="header__logo-text">Kezia Oliveira</span>
        </a>

        <button
          className={`header__toggle ${menuOpen ? 'header__toggle--active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
          <span className="header__toggle-bar"></span>
        </button>

        <nav
          id="main-nav"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          role="navigation"
          aria-label="Navegação principal"
        >
          <ul className="header__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`header__link ${activeSection === item.href.slice(1) ? 'header__link--active' : ''}`}
                  onClick={handleLinkClick}
                >
                  {t.ui.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="header__lang-toggle" role="group" aria-label="Idioma">
            <button
              className={`header__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => lang !== 'en' && toggleLang()}
            >
              EN
            </button>
            <span className="header__lang-sep" aria-hidden="true">/</span>
            <button
              className={`header__lang-btn ${lang === 'pt' ? 'is-active' : ''}`}
              onClick={() => lang !== 'pt' && toggleLang()}
            >
              PT
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
