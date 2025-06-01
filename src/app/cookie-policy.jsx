import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CookiePolicyPage() {
  const { t } = useTranslation();
  return (
    <main style={{maxWidth: 800, margin: '0 auto', padding: '2rem'}}>
      <h1>{t('footer.legal.cookies')}</h1>
      <p><i>{t('cookiePolicy.lastUpdated')}</i></p>
      <h2>{t('cookiePolicy.title')}</h2>
      <p>{t('cookiePolicy.introduction')}</p>
    </main>
  );
}
