"use client";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PolicyLayout from '@/app/components/PolicyLayout';

export default function CookiePolicyPage() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  return (
    <PolicyLayout title={t('footer.legal.cookies')}>
      <h2>{t('cookiePolicy.title')}</h2>
      <p>{t('cookiePolicy.introduction')}</p>
      
      <h2>{t('cookiePolicy.types.title')}</h2>
      <p>{t('cookiePolicy.types.description')}</p>
      <ul>
        <li>
          <strong>{t('cookieConsent.necessary')}</strong>
          <p>{t('cookieConsent.necessaryDescription')}</p>
        </li>
        <li>
          <strong>{t('cookieConsent.analytics')}</strong>
          <p>{t('cookieConsent.analyticsDescription')}</p>
        </li>
        <li>
          <strong>{t('cookieConsent.preferences')}</strong>
          <p>{t('cookieConsent.preferencesDescription')}</p>
        </li>
        <li>
          <strong>{t('cookieConsent.marketing')}</strong>
          <p>{t('cookieConsent.marketingDescription')}</p>
        </li>
      </ul>

      <h2>{t('cookiePolicy.manage.title')}</h2>
      <p>{t('cookiePolicy.manage.description')}</p>
      <button
        onClick={() => window.klaro && window.klaro.show && window.klaro.show()}
        className="klaro-btn"
      >
        {t('footer.legal.manageCookies')}
      </button>
    </PolicyLayout>
  );
}
