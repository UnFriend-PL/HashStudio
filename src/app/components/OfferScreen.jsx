import "@/app/styles/Offer.scss"
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { offerData, priceDisclaimer } from "@/app/data/offerData";

const PackageHeader = ({ name, price, isSelected, onSelect }) => {
    const { t } = useTranslation();
    return (
        <div 
            className={`PackageCell ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
            role="button"
        >
            <h3>{t(name)}</h3>
            <div className="Price">${price}</div>
            {isSelected && <div className="SelectedMark"><BsCheckLg /></div>}
        </div>
    );
};

const FeatureRow = ({ featureIndex, packages, selectedPackageIndex }) => {
    const { t } = useTranslation();
    const featureName = packages[0].features[featureIndex].name;
    return (
        <div className="FeatureRow">
            <div className="FeatureCell">{t(featureName)}</div>
            {packages.map((pkg, index) => (
                <div key={index} className={`PackageCell ${index === selectedPackageIndex ? 'highlighted' : ''}`}>
                    {pkg.features[featureIndex].included ? 
                        <BsCheckLg className="included" /> : 
                        <BsXLg className="not-included" />}
                </div>
            ))}
        </div>
    );
};

const CategoryHeader = ({ title, isExpanded, onToggle, isSelected }) => {
    const { t } = useTranslation();
    return (
        <div className="CategoryHeaderWrapper">
            <div 
                className={`CategoryHeader ${isExpanded ? 'expanded' : ''} ${isSelected ? 'selected' : ''}`} 
                onClick={onToggle}
                role="button"
            >
                <h2>{t(title)}</h2>
                {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
            </div>
        </div>
    );
};

const PackageGrid = ({ packages, isExpanded, selectedPackageIndex, onPackageSelect }) => {
    const { t } = useTranslation();
    return (
        <div className={`PackagesGrid ${isExpanded ? 'expanded' : ''}`}>
            <div className="PackageHeaders">
                <div className="FeatureCell">{t("offer.features")}</div>
                {packages.map((pkg, index) => (
                    <PackageHeader 
                        key={index} 
                        name={pkg.name} 
                        price={pkg.price}
                        isSelected={index === selectedPackageIndex}
                        onSelect={() => onPackageSelect(index)}
                    />
                ))}
            </div>
            <div className="Features">
                {packages[0].features.map((_, featureIndex) => (
                    <FeatureRow 
                        key={featureIndex} 
                        featureIndex={featureIndex}
                        packages={packages}
                        selectedPackageIndex={selectedPackageIndex}
                    />
                ))}
            </div>
        </div>
    );
};

const ServiceCategory = ({ data, isSelected, selectedPackageIndex, onPackageSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="ServiceCategory">
            <CategoryHeader 
                title={data.category}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
                isSelected={isSelected}
            />
            <PackageGrid 
                packages={data.packages}
                isExpanded={isExpanded}
                selectedPackageIndex={selectedPackageIndex}
                onPackageSelect={onPackageSelect}
            />
        </div>
    );
};

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

export default function OfferScreen() {
    const { t } = useTranslation();
    const [selectedPackages, setSelectedPackages] = useState({});

    const handlePackageSelection = (categoryId, packageIndex) => {
        setSelectedPackages(prev => {
            // If the same package is clicked again, unselect it
            if (prev[categoryId] === packageIndex) {
                const newState = { ...prev };
                delete newState[categoryId];
                return newState;
            }
            // Otherwise, select the new package
            return { ...prev, [categoryId]: packageIndex };
        });
    };

    // Create an array of selected services for the contact form
    const selectedServices = Object.entries(selectedPackages).map(([categoryId, packageIndex]) => {
        const category = offerData[categoryId].category;
        const packageData = offerData[categoryId].packages[packageIndex];
        return {
            category,
            packageName: packageData.name,
            price: packageData.price
        };
    });

    return (
        <div className="OfferScreenContainer">
            <div className="Services">
                {Object.entries(offerData).map(([categoryId, categoryData]) => (
                    <ServiceCategory
                        key={categoryId}
                        data={categoryData}
                        isSelected={categoryId in selectedPackages}
                        selectedPackageIndex={selectedPackages[categoryId]}
                        onPackageSelect={(packageIndex) => handlePackageSelection(categoryId, packageIndex)}
                    />
                ))}
                <div className="PriceDisclaimer">
                    {t(priceDisclaimer)}
                </div>
            </div>
            
            {selectedServices.length > 0 && (
                <div className="ContactFormContainer">
                    <ContactForm selectedServices={selectedServices} />
                </div>
            )}
        </div>
    );
}