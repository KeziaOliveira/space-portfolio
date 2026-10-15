import { useLanguage } from '../../context/LanguageContext';
import HeartIcon from '../../assets/icons-contact/heart-solid-full (1).svg';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__bottom-row">
          <p className="footer__copy" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: '500', color: '#cbd5e1' }}>
            {t.ui.footer.madeWithPrefix} <img src={HeartIcon} alt="heart" className="footer__heart" style={{ width: '20px', height: '20px', filter: 'invert(1) sepia(1) saturate(5) hue-rotate(300deg)' }} /> {t.ui.footer.madeWithSuffix}
          </p>

          {/* Back to Top Button */}
          <button
            className="footer__to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(calc(-50% - 4px))';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(-50%)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
