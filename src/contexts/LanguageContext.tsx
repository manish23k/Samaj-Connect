// src/contexts/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Locale, type TranslationKey } from '@/lib/i18n';

interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: TranslationKey, args?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Locale>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('samajAppLanguage') as Locale;
    if (storedLang && (storedLang === 'en' || storedLang === 'gu')) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem('samajAppLanguage', lang);
  };

  const t = (key: TranslationKey, args?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['en'][key] || key.toString();
    if (args) {
      Object.keys(args).forEach(argKey => {
        text = text.replace(`{{${argKey}}}`, String(args[argKey]));
      });
    }
    return text;
  };
  

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
