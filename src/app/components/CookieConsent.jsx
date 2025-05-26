'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@/app/styles/CookieConsent.module.scss';
import 'klaro/dist/klaro.min.css';

const loadKlaro = () => {
  return import('klaro/dist/klaro-no-css');
};

export default function CookieConsent() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const initializeKlaro = async () => {
      const klaro = (await loadKlaro()).default;
      
      window.klaroConfig = {
        privacyPolicy: '/privacy-policy',
        default: false,
        acceptAll: true,
        hideDeclineAll: false,
        storageMethod: 'localStorage',
        cookieName: 'cookie-consent',
        cookieExpiresAfterDays: 365,
        cookieDomain: window.location.hostname,
        lang: i18n.language,
        noticeAsModal: false,
        hideLearnMore: false,
        styling: {
          displayAllButton: true,
          checkboxType: 'switch',
        },
        translations: {
          [i18n.language]: {
            consentNotice: {
              description: t('cookieConsent.description'),
              learnMore: t('common.learnMore'),
            },
            consentModal: {
              title: t('cookieConsent.title'),
              description: t('cookieConsent.modalDescription'),
            },
            purposes: {
              necessary: t('cookieConsent.necessary'),
              analytics: t('cookieConsent.analytics'),
              preferences: t('cookieConsent.preferences'),
              marketing: t('cookieConsent.marketing'),
            },
            googleAnalytics: {
              description: t('cookieConsent.analyticsDescription'),
            },
            necessary: {
              description: t('cookieConsent.necessaryDescription'),
            },
            preferences: {
              description: t('cookieConsent.preferencesDescription'),
            },
            marketing: {
              description: t('cookieConsent.marketingDescription'),
            },
            ok: t('common.accept'),
            save: t('common.save'),
            acceptAll: t('common.acceptAll'),
            decline: t('common.decline'),
            close: t('common.close'),
          },
        },
        apps: [
          {
            name: 'googleAnalytics',
            title: 'Google Analytics',
            purposes: ['analytics'],
            cookies: [
              ['_ga', '/', 'hashstudio.pl'],
              ['_gid', '/', 'hashstudio.pl'],
              ['_gat', '/', 'hashstudio.pl'],
            ],
            required: false,
            optOut: false,
            onlyOnce: false,
            callback: function(consent, app) {
              if (consent) {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
              }
            },
          },
        ],
      };

      const style = document.createElement('style');
      style.textContent = `
        .klaro .cookie-notice {
          animation: slideInUp 0.5s ease-out;
        }
        @keyframes slideInUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);

      klaro.setup(window.klaroConfig);
    };

    initializeKlaro();
  }, [i18n.language, t]);

  return null;
}
