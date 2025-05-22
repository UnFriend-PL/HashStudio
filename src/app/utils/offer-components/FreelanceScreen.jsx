import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceCategory from '@/app/utils/offer-components/ServiceCategory';
import ContactForm from '@/app/utils/offer-components/ContactForm';
import AIChat from '@/app/utils/offer-components/AIChat';
import { offerData } from '@/app/data/offerData';
import { RiBardFill  } from 'react-icons/ri';
import '@/app/utils/offer-components/styles/FreelanceScreen.scss';
import { useChatContext } from '@/app/context/ChatContext';

const FreelanceScreen = () => {
    const { t } = useTranslation();
    const { selectedServices, setSelectedServices } = useChatContext();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleChatOpen = (category) => {
        setSelectedCategory(category);
        setIsChatOpen(true);
    };

    return (
        <div className="FreelanceScreen">
            <div className="FreelancePanel">
                <div className="FreelanceTitle">
                    <h1>{t('offer.title')}</h1>
                    <p>{t('offer.subtitle')}</p>
                    <p className="SelectionGuide">{t('offer.selectionGuide')}</p>
                    <p className="PriceDisclaimer">{t('offer.priceDisclaimer')}</p>
                    <button 
                        className="GlobalChatButton"
                        onClick={() => handleChatOpen(null)}
                        title={t('offer.chat.globalButton')}
                    >
                        <RiBardFill />
                        <span>{t('offer.chat.globalButton')}</span>
                    </button>
                </div>

                <AIChat 
                    isOpen={isChatOpen}
                    onClose={() => {
                        setIsChatOpen(false);
                        setSelectedCategory(null);
                    }}
                    initialCategory={selectedCategory}
                />

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
                        onChatOpen={handleChatOpen}
                    />
                ))}

                {selectedServices.length > 0 && <ContactForm />}
            </div>
        </div>
    );
};

export default FreelanceScreen; 