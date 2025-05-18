import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { offerData, priceDisclaimer } from "@/app/data/offerData";

import ServiceCategory from "@/app/utils/offer-components/ServiceCategory";
import ContactForm from "@/app/utils/offer-components/ContactForm";

import "@/app/utils/offer-components/styles/OfferScreen.scss";

export default function OfferScreen() {
    const { t } = useTranslation();
    const [selectedPackages, setSelectedPackages] = useState({});

    const handlePackageSelection = (categoryId, packageIndex) => {
        setSelectedPackages(prev => {
            if (prev[categoryId] === packageIndex) {
                const newState = { ...prev };
                delete newState[categoryId];
                return newState;
            }
            return {
                ...prev,
                [categoryId]: packageIndex
            };
        });
    };

    const selectedServices = Object.entries(selectedPackages)
        .map(([categoryId, packageIndex]) => ({
            category: offerData[categoryId].category,
            packageName: offerData[categoryId].packages[packageIndex].name,
            price: offerData[categoryId].packages[packageIndex].price
        }));

    return (
        <div className="OfferScreen">
            <div className="OfferPanel">
                <div className="OfferTitle">
                    <h1>{t('offer.title')}</h1>
                    <p>{t('offer.subtitle')}</p>
                    <p className="SelectionGuide">{t('offer.selectionGuide')}</p>
                    <p className="PriceDisclaimer">{t(priceDisclaimer)}</p>
                </div>
                {Object.entries(offerData).map(([categoryId, categoryData]) => (
                    <ServiceCategory 
                        key={categoryId} 
                        data={categoryData}
                        isSelected={selectedPackages[categoryId] !== undefined}
                        selectedPackageIndex={selectedPackages[categoryId]}
                        onPackageSelect={(packageIndex) => handlePackageSelection(categoryId, packageIndex)}
                    />
                ))}
                {selectedServices.length > 0 && (
                    <ContactForm selectedServices={selectedServices} />
                )}
            </div>
        </div>
    );
}
