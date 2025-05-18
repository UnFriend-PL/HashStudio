import { useState } from "react";
import { useTranslation } from 'react-i18next';

const ContactForm = ({ selectedServices }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        status: 'idle',
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, status: 'sending', error: null }));

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    selectedServices: selectedServices.map(service => ({
                        category: service.category,
                        package: service.packageName,
                        price: service.price
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            setFormData(prev => ({ 
                ...prev, 
                status: 'success',
                name: '',
                email: '',
                phone: '',
                message: ''
            }));

            setTimeout(() => {
                setFormData(prev => ({ ...prev, status: 'idle' }));
            }, 3000);

        } catch (error) {
            setFormData(prev => ({ 
                ...prev, 
                status: 'error',
                error: error.message
            }));
        }
    };

    return (
        <form className="ContactForm" onSubmit={handleSubmit}>
            <h3>{t('offer.contactForm.title')}</h3>
            <div className="SelectedServices">
                <h4>{t('offer.contactForm.selectedServices')}</h4>
                <ul>
                    {selectedServices.map((service, index) => (
                        <li key={index}>
                            {t(service.category)} - {t(service.packageName)} (${service.price})
                        </li>
                    ))}
                </ul>
                <div className="TotalPrice">
                    {t('offer.contactForm.total')} ${selectedServices.reduce((sum, service) => sum + parseInt(service.price), 0)}
                </div>
            </div>
            <div className="FormGroup">
                <label htmlFor="name">{t('offer.contactForm.name')}</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="FormGroup">
                <label htmlFor="email">{t('offer.contactForm.email')}</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="FormGroup">
                <label htmlFor="phone">{t('offer.contactForm.phone')}</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="FormGroup">
                <label htmlFor="message">{t('offer.contactForm.message')}</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                />
            </div>
            <button 
                type="submit" 
                className={`SubmitButton ${formData.status}`}
                disabled={formData.status === 'sending'}
            >
                {formData.status === 'sending' ? t('offer.contactForm.sending') : 
                 formData.status === 'success' ? t('offer.contactForm.sent') : 
                 t('offer.contactForm.send')}
            </button>
            {formData.error && (
                <div className="ErrorMessage">
                    {formData.error}
                </div>
            )}
        </form>
    );
};

export default ContactForm; 