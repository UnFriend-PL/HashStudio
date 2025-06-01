"use client";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PolicyLayout from '@/app/components/PolicyLayout';

export default function PrivacyPolicyPage() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  return (
    <PolicyLayout title={t('footer.legal.privacy')}>
      <h2>{t('privacyPolicy.title')}</h2>
      <p>{t('privacyPolicy.introduction')}</p>

      <h2>{t('privacyPolicy.dataCollection.title')}</h2>
      <p>{t('privacyPolicy.dataCollection.description')}</p>
      <ul>
        <li>{t('privacyPolicy.dataCollection.personalInfo')}</li>
        <li>{t('privacyPolicy.dataCollection.usageData')}</li>
        <li>{t('privacyPolicy.dataCollection.cookies')}</li>
      </ul>

      <h2>{t('privacyPolicy.dataUsage.title')}</h2>
      <p>{t('privacyPolicy.dataUsage.description')}</p>
      <ul>
        <li>{t('privacyPolicy.dataUsage.provide')}</li>
        <li>{t('privacyPolicy.dataUsage.improve')}</li>
        <li>{t('privacyPolicy.dataUsage.communicate')}</li>
      </ul>

      <h2>{t('privacyPolicy.dataProtection.title')}</h2>
      <p>{t('privacyPolicy.dataProtection.description')}</p>

      <h2>{t('privacyPolicy.rights.title')}</h2>
      <p>{t('privacyPolicy.rights.description')}</p>
      <ul>
        <li>{t('privacyPolicy.rights.access')}</li>
        <li>{t('privacyPolicy.rights.correction')}</li>
        <li>{t('privacyPolicy.rights.deletion')}</li>
        <li>{t('privacyPolicy.rights.objection')}</li>
      </ul>

      <h2>{t('privacyPolicy.contact.title')}</h2>
      <p>{t('privacyPolicy.contact.description')}</p>
      <p>
        <a href={`mailto:${t('footer.address.email')}`}>
          {t('footer.address.email')}
        </a>
      </p>
    </PolicyLayout>
  );
}
