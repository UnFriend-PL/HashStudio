'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
    setIsOpen(false);
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="language-switcher-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t('langSwitcher.chooseLanguage')}
      >
        {i18n.language === 'pl' ? 'PL' : 'EN'}
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          <button 
            className={`language-option ${i18n.language === 'pl' ? 'active' : ''}`} 
            onClick={() => changeLanguage('pl')}
          >
            {t('langSwitcher.pl')}
          </button>
          <button 
            className={`language-option ${i18n.language === 'en' ? 'active' : ''}`} 
            onClick={() => changeLanguage('en')}
          >
            {t('langSwitcher.en')}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 