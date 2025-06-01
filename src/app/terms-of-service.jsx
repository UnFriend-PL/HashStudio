import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TermsOfServicePage() {
  const { t } = useTranslation();
  return (
    <main style={{maxWidth: 800, margin: '0 auto', padding: '2rem'}}>
      <h1>{t('footer.legal.terms')}</h1>
      <p><i>{t('termsOfService.lastUpdated')}</i></p>
      <h2>{t('termsOfService.title')}</h2>
      <p>{t('termsOfService.introduction')}</p>
      {/* Dodaj więcej sekcji według potrzeb, np. t('termsOfService.useLicense.title') itd. */}
    </main>
  );
}
