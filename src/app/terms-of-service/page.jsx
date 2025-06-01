"use client";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PolicyLayout from '@/app/components/PolicyLayout';

export default function TermsOfServicePage() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  return (
    <PolicyLayout title={t('footer.legal.terms')}>
      <h2>{t('termsOfService.title')}</h2>
      <p>{t('termsOfService.introduction')}</p>

      <h2>{t('termsOfService.acceptance.title')}</h2>
      <p>{t('termsOfService.acceptance.description')}</p>

      <h2>{t('termsOfService.services.title')}</h2>
      <p>{t('termsOfService.services.description')}</p>
      <ul>
        <li>{t('termsOfService.services.webDevelopment')}</li>
        <li>{t('termsOfService.services.webApplications')}</li>
        <li>{t('termsOfService.services.uiUxDesign')}</li>
        <li>{t('termsOfService.services.graphicDesign')}</li>
      </ul>

      <h2>{t('termsOfService.obligations.title')}</h2>
      <p>{t('termsOfService.obligations.description')}</p>
      <ul>
        <li>{t('termsOfService.obligations.provide')}</li>
        <li>{t('termsOfService.obligations.maintain')}</li>
        <li>{t('termsOfService.obligations.protect')}</li>
      </ul>

      <h2>{t('termsOfService.intellectualProperty.title')}</h2>
      <p>{t('termsOfService.intellectualProperty.description')}</p>

      <h2>{t('termsOfService.liability.title')}</h2>
      <p>{t('termsOfService.liability.description')}</p>

      <h2>{t('termsOfService.termination.title')}</h2>
      <p>{t('termsOfService.termination.description')}</p>

      <h2>{t('termsOfService.changes.title')}</h2>
      <p>{t('termsOfService.changes.description')}</p>

      <h2>{t('termsOfService.contact.title')}</h2>
      <p>{t('termsOfService.contact.description')}</p>
      <p>
        <a href={`mailto:${t('footer.address.email')}`}>
          {t('footer.address.email')}
        </a>
      </p>
    </PolicyLayout>
  );
}
