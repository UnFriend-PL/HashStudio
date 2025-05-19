import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { BsArrowRight } from "react-icons/bs";

const ContactForm = ({ selectedServices }) => {
    const { t } = useTranslation();
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

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
        
        // TODO: Implement actual form submission
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
        
        setIsSending(false);
        setIsSent(true);
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
                                    rows="4"
                                />
                            </div>
                        </>
                    )}

                    <button 
                        type="submit" 
                        className="SubmitButton"
                        disabled={isSending}
                    >
                        {isSending ? (
                            t('offer.contactForm.sending')
                        ) : (
                            <>
                                {t('offer.contactForm.send')}
                                <BsArrowRight />
                            </>
                        )}
                    </button>
                </form>
            ) : (
                <div className="SuccessMessage">
                    <h3>{t('offer.contactForm.sent')}</h3>
                    <p>{t('offer.contactForm.successMessage')}</p>
                </div>
            )}
        </div>
    );
};

export default ContactForm; 