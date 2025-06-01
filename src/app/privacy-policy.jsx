import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  return (
    <main style={{maxWidth: 800, margin: '0 auto', padding: '2rem'}}>
      <h1>{t('footer.legal.privacy')}</h1>
      <p><i>{t('privacyPolicy.lastUpdated')}</i></p>
      <h2>{t('privacyPolicy.title')}</h2>
      <p>{t('privacyPolicy.introduction')}</p>
      {/* Dodaj więcej sekcji według potrzeb, np. t('privacyPolicy.dataCollection.title') itd. */}
    </main>
  );
}
