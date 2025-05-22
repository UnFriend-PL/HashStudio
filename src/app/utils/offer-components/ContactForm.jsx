import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { BsArrowRight } from "react-icons/bs";
import { useChatContext } from '@/app/context/ChatContext';

const ContactForm = () => {
    const { t } = useTranslation();
    const { selectedServices } = useChatContext();
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setError(null);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    selectedServices: selectedServices.map(service => ({
                        category: service.category,
                        package: service.packageName, 
                        price: service.price
                    }))
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Unknown error');
            }

            setIsSent(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    };

    const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

    return (
        <div className="ContactForm">
            <h2>{t('offer.contactForm.title')}</h2>

            <div className="FormModeToggle">
                <button 
                    className={`ModeButton ${!isAdvanced ? 'active' : ''}`}
                    onClick={() => setIsAdvanced(false)}
                >
                    {t('offer.contactForm.simpleMode')}
                </button>
                <button 
                    className={`ModeButton ${isAdvanced ? 'active' : ''}`}
                    onClick={() => setIsAdvanced(true)}
                >
                    {t('offer.contactForm.advancedMode')}
                </button>
            </div>

            <div className="SelectedServices">
                <h3>{t('offer.contactForm.selectedServices')}</h3>
                {selectedServices.map((service, index) => (
                    <div key={index} className="ServiceItem">
                        <span>{service.category} - {service.packageName}</span>
                        <span>{service.price} PLN</span>
                    </div>
                ))}
                <div className="TotalPrice">
                    <span>{t('offer.contactForm.total')}</span>
                    <span>{totalPrice} PLN</span>
                </div>
            </div>

            {!isSent ? (
                <form onSubmit={handleSubmit}>
                    <div className="FormGroup">
                        <label htmlFor="name">{t('offer.contactForm.name')}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    {isAdvanced && (
                        <>
                            <div className="FormGroup">
                                <label htmlFor="phone">{t('offer.contactForm.phone')}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="FormGroup">
                                <label htmlFor="message">{t('offer.contactForm.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                    
                    <button 
                        type="submit" 
                        className={`SubmitButton ${isSending ? 'sending' : ''}`}
                        disabled={isSending}
                    >
                        {isSending ? t('offer.contactForm.sending') : t('offer.contactForm.send')}
                        {!isSending && <BsArrowRight />}
                    </button>
                </form>
            ) : (
                <div className="SuccessMessage">
                    <h3>{t('offer.contactForm.sent')}</h3>
                    <p>{t('offer.contactForm.successMessage')}</p>
                </div>
            )}
            {error && <div className="ErrorMessage">{error}</div>}
        </div>
    );
};

export default ContactForm;
