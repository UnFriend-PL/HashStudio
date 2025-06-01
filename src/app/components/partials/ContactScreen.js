import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';
import styles from '@/app/styles/ContactScreen.scss';
import { useTranslation } from 'react-i18next';

const ContactScreen = () => {
    const { t } = useTranslation();

    return (
        <div className="ContactScreen">
            <div className="ContactContainer">
                <h2>{t('contact.title')}</h2>
                <p>{t('contact.subtitle')}</p>
                
                <div className="ContactMethods">
                    <a href="mailto:szymonecki1233@gmail.com" className="ContactMethod">
                        <FaEnvelope className="icon" />
                        <span>{t('contact.email')}</span>
                    </a>
                    
                    <a href="tel:+48600029636" className="ContactMethod">
                        <FaPhone className="icon" />
                        <span>{t('contact.phone')}</span>
                    </a>
                    
                    <a href="https://www.linkedin.com/in/smarcinkowski/" target="_blank" rel="noopener noreferrer" className="ContactMethod">
                        <FaLinkedin className="icon" />
                        <span>{t('contact.linkedin')}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactScreen; 