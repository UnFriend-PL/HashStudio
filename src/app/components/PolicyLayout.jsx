"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/PolicyLayout.module.scss';

export default function PolicyLayout({ children, title, lastUpdated }) {
  const { t, i18n } = useTranslation();
  if (typeof window !== 'undefined' && !i18n.isInitialized) return null;
  
  return (
    <div className={styles.policyContainer}>
      <main className={styles.policyContent}>
        <h1>{title}</h1>
        <p className={styles.lastUpdated}>
          <i>{lastUpdated || t('footer.legal.lastUpdated')}</i>
        </p>
        {children}
      </main>
    </div>
  );
} 