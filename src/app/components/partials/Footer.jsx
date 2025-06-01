import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import styles from '@/app/styles/Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      // Reset subscription message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Company Info */}
        <div className={styles.companyInfo}>
          <h2>{t('footer.title')}</h2>
          <p>{t('footer.description')}</p>
          <address>
            {t('footer.address.line1')}<br />
            {t('footer.address.city')}<br />
            {t('footer.address.country')}<br />
            {t('footer.address.nip')}<br />
            <a href={`mailto:${t('footer.address.email')}`}>
              {t('footer.address.email')}
            </a>
          </address>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/smarcinkowski/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/UnFriend-PL" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerLinks}>
          <h3>{t('footer.company')}</h3>
          <nav aria-label={t('footer.navigationLabel')}>
            <ul>
              <li><a href="#welcome">{t('menu.welcome')}</a></li>
              <li><a href="#portfolio">{t('menu.portfolio')}</a></li>
              <li><a href="#collaboration">{t('menu.collaboration')}</a></li>
              <li><a href="#design">{t('menu.design')}</a></li>
              <li><a href="#freelance">{t('menu.freelance')}</a></li>
            </ul>
          </nav>
        </div>

        {/* Services
        <div className={styles.servicesSection}>
          <h3>{t('footer.services')}</h3>
          <ul>
            {t('footer.servicesList', { returnObjects: true }).map((service, index) => (
              <li key={index}>
                <a href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Legal Links */}
        <div className={styles.legalSection}>
          <h3>{t('footer.legal.title')}</h3>
          <ul>
            <li><Link href="/privacy-policy">{t('footer.legal.privacy')}</Link></li>
            <li><Link href="/terms-of-service">{t('footer.legal.terms')}</Link></li>
            <li><Link href="/cookie-policy">{t('footer.legal.cookies')}</Link></li>
            <li>
              <button
                type="button"
                className={styles.klaroBtn}
                onClick={() => window.klaro && window.klaro.show && window.klaro.show()}
              >
                {t('footer.legal.manageCookies')}
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* <div className={styles.newsletter}>
          <h3>{t('footer.newsletter.title')}</h3>
          <p>{t('footer.newsletter.description')}</p>
          {isSubscribed ? (
            <div className={`${styles.successMessage} show`}>
              {t('footer.newsletter.success')}
            </div>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                />
                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className={styles.spinner}></span>
                      {t('sending')}
                    </>
                  ) : (
                    t('footer.newsletter.button')
                  )}
                </button>
              </div>
            </form>
          )}
        </div> */}
      </div>
      
      <div className={styles.copyright}>
        &copy; {currentYear} {t('footer.title')}. {t('footer.copyright')} | 
        {t('footer.madeWith')}
      </div>
    </footer>
  );
};

export default Footer;