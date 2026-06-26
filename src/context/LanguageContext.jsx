import { createContext, useContext, useState } from 'react';
import { content } from '../data/content';

const LanguageContext = createContext(null);

function detectLang() {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLang);

  const toggleLang = () => setLang(l => (l === 'en' ? 'pt' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
