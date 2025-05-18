import "@/app/styles/Offer.scss"
import { useState } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { offerData, priceDisclaimer } from "@/app/data/offerData";

const PackageHeader = ({ name, price, isSelected, onSelect }) => (
    <div 
        className={`PackageCell ${isSelected ? 'selected' : ''}`}
        onClick={onSelect}
        role="button"
    >
        <h3>{name}</h3>
        <div className="Price">${price}</div>
        {isSelected && <div className="SelectedMark"><BsCheckLg /></div>}
    </div>
);

const FeatureRow = ({ featureIndex, packages, selectedPackageIndex }) => {
    const featureName = packages[0].features[featureIndex].name;
    return (
        <div className="FeatureRow">
            <div className="FeatureCell">{featureName}</div>
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

const CategoryHeader = ({ title, isExpanded, onToggle, isSelected }) => (
    <div className="CategoryHeaderWrapper">
        <div 
            className={`CategoryHeader ${isExpanded ? 'expanded' : ''} ${isSelected ? 'selected' : ''}`} 
            onClick={onToggle}
            role="button"
        >
            <h2>{title}</h2>
            {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
        </div>
    </div>
);

const PackageGrid = ({ packages, isExpanded, selectedPackageIndex, onPackageSelect }) => (
    <div className={`PackagesGrid ${isExpanded ? 'expanded' : ''}`}>
        <div className="PackageHeaders">
            <div className="FeatureCell">Features</div>
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
            <h3>Contact Us About Selected Services</h3>
            <div className="SelectedServices">
                <h4>Selected Services:</h4>
                <ul>
                    {selectedServices.map((service, index) => (
                        <li key={index}>
                            {service.category} - {service.packageName} (${service.price})
                        </li>
                    ))}
                </ul>
                <div className="TotalPrice">
                    Total: ${selectedServices.reduce((sum, service) => sum + parseInt(service.price), 0)}
                </div>
            </div>
            <div className="FormGroup">
                <label htmlFor="name">Your Name:</label>
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
                <label htmlFor="email">Your Email:</label>
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
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="FormGroup">
                <label htmlFor="message">Additional Message:</label>
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
                {formData.status === 'sending' ? 'Sending...' : 
                 formData.status === 'success' ? 'Sent Successfully!' : 
                 'Send Inquiry'}
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
                    <h1>Our Services</h1>
                    <p>Choose from our comprehensive range of services</p>
                    <p className="SelectionGuide">Click on a package variant to select/unselect a service</p>
                    <p className="PriceDisclaimer">{priceDisclaimer}</p>
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