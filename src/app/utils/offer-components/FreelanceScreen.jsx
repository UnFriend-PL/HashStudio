import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceCategory from '@/app/utils/offer-components/ServiceCategory';
import ContactForm from '@/app/utils/offer-components/ContactForm';
import AIChat from '@/app/utils/offer-components/AIChat';
import { offerData } from '@/app/data/offerData';
import '@/app/utils/offer-components/styles/OfferScreen.scss';

const FreelanceScreen = () => {
    const { t } = useTranslation();
    const [selectedServices, setSelectedServices] = useState([]);

    return (
        <div className="OfferScreen">
            <div className="OfferPanel">
                <div className="OfferTitle">
                    <h1>{t('offer.title')}</h1>
                    <p>{t('offer.subtitle')}</p>
                    <p className="SelectionGuide">{t('offer.selectionGuide')}</p>
                    <p className="PriceDisclaimer">{t('offer.priceDisclaimer')}</p>
                </div>

                <AIChat offerData={offerData} selectedServices={selectedServices} setSelectedServices={setSelectedServices} />

                {offerData.categories.map((category, index) => (
                    <ServiceCategory
                        key={index}
                        category={category}
                        onServiceSelect={(service) => {
                            setSelectedServices(prev => {
                                const exists = prev.find(s => 
                                    s.category === service.category && 
                                    s.packageName === service.packageName
                                );
                                if (exists) {
                                    return prev.filter(s => 
                                        !(s.category === service.category && 
                                        s.packageName === service.packageName)
                                    );
                                }
                                return [...prev, service];
                            });
                        }}
                        selectedServices={selectedServices}
                    />
                ))}

                {selectedServices.length > 0 && (
                    <ContactForm selectedServices={selectedServices} />
                )}
            </div>
        </div>
    );
};

export default FreelanceScreen; 