'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/CookieConsent.module.scss';
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
        lang: i18n.language.startsWith('pl') ? 'pl' : 'en',
        noticeAsModal: false,
        hideLearnMore: false,
        styling: {
          displayAllButton: true,
          checkboxType: 'switch',
        },
        translations: {
          en: {
            consentNotice: {
              description: t('cookieConsent.description', { lng: 'en' }),
              learnMore: t('common.learnMore', { lng: 'en' }),
            },
            consentModal: {
              title: t('cookieConsent.title', { lng: 'en' }),
              description: t('cookieConsent.modalDescription', { lng: 'en' }),
            },
            purposes: {
              necessary: t('cookieConsent.necessary', { lng: 'en' }),
              analytics: t('cookieConsent.analytics', { lng: 'en' }),
              preferences: t('cookieConsent.preferences', { lng: 'en' }),
              marketing: t('cookieConsent.marketing', { lng: 'en' }),
            },
            googleAnalytics: {
              description: t('cookieConsent.analyticsDescription', { lng: 'en' }),
            },
            necessary: {
              description: t('cookieConsent.necessaryDescription', { lng: 'en' }),
            },
            preferences: {
              description: t('cookieConsent.preferencesDescription', { lng: 'en' }),
            },
            marketing: {
              description: t('cookieConsent.marketingDescription', { lng: 'en' }),
            },
            ok: t('common.accept', { lng: 'en' }),
            save: t('common.save', { lng: 'en' }),
            acceptAll: t('common.acceptAll', { lng: 'en' }),
            decline: t('common.decline', { lng: 'en' }),
            close: t('common.close', { lng: 'en' }),
            privacyPolicy: {
              text: t('privacyPolicy.text', { lng: 'en' })
            },
            purposeItem: {
              service: t('purposeItem.service', { lng: 'en' })
            },
            acceptSelected: t('common.acceptSelected', { lng: 'en' }),
            poweredBy: 'Powered by Klaro',
            service: {
              purpose: t('service.purpose', { lng: 'en' })
            }
          },
          pl: {
            consentNotice: {
              description: t('cookieConsent.description', { lng: 'pl' }),
              learnMore: t('common.learnMore', { lng: 'pl' }),
            },
            consentModal: {
              title: t('cookieConsent.title', { lng: 'pl' }),
              description: t('cookieConsent.modalDescription', { lng: 'pl' }),
            },
            purposes: {
              necessary: t('cookieConsent.necessary', { lng: 'pl' }),
              analytics: t('cookieConsent.analytics', { lng: 'pl' }),
              preferences: t('cookieConsent.preferences', { lng: 'pl' }),
              marketing: t('cookieConsent.marketing', { lng: 'pl' }),
            },
            googleAnalytics: {
              description: t('cookieConsent.analyticsDescription', { lng: 'pl' }),
            },
            necessary: {
              description: t('cookieConsent.necessaryDescription', { lng: 'pl' }),
            },
            preferences: {
              description: t('cookieConsent.preferencesDescription', { lng: 'pl' }),
            },
            marketing: {
              description: t('cookieConsent.marketingDescription', { lng: 'pl' }),
            },
            ok: t('common.accept', { lng: 'pl' }),
            save: t('common.save', { lng: 'pl' }),
            acceptAll: t('common.acceptAll', { lng: 'pl' }),
            decline: t('common.decline', { lng: 'pl' }),
            close: t('common.close', { lng: 'pl' }),
            privacyPolicy: {
              text: t('privacyPolicy.text', { lng: 'pl' })
            },
            purposeItem: {
              service: t('purposeItem.service', { lng: 'pl' })
            },
            acceptSelected: t('common.acceptSelected', { lng: 'pl' }),
            poweredBy: 'Wspierane przez Klaro',
            service: {
              purpose: t('service.purpose', { lng: 'pl' })
            }
          }
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
        
        .klaro .cookie-modal {
          background: var(--background);
          color: var(--foreground);
        }

        .klaro .cm-btn {
          background: var(--foreground);
          color: var(--background);
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          transition: opacity 0.2s;
        }

        .klaro .cm-btn:hover {
          opacity: 0.9;
        }

        .klaro .cm-btn-success {
          background: #4CAF50;
          color: white;
        }

        .klaro .cm-btn-danger {
          background: #f44336;
          color: white;
        }

        .klaro .cm-btn-info {
          background: #2196F3;
          color: white;
        }

        .klaro .cm-header h1 {
          color: var(--foreground);
        }

        .klaro .cm-body ul li {
          color: var(--foreground);
        }
      `;
      document.head.appendChild(style);

      klaro.setup(window.klaroConfig);
    };

    initializeKlaro();
  }, [i18n.language, t]);

  return null;
}
