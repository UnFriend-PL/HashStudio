import { useTranslation } from 'react-i18next';
import PackageHeader from './PackageHeader';
import FeatureRow from './FeatureRow';
import '@/app/utils/offer-components/styles/PackageGrid.scss';

const PackageGrid = ({ packages, isExpanded, onServiceSelect, selectedServices, category }) => {
    const { t } = useTranslation();
    
    if (!isExpanded) return null;
    
    return (
        <div className="PackageGrid">
            {packages.map((pkg, index) => (
                <div 
                    key={index} 
                    className={`PackageCard ${selectedServices.some(service => 
                        service.packageName === pkg.name &&
                        service.category === category.name
                    ) ? 'selected' : ''}`}
                >
                    <PackageHeader 
                        name={pkg.name} 
                        price={pkg.price}
                        isSelected={selectedServices.some(service => 
                            service.packageName === pkg.name &&
                            service.category === category.name
                        )}
                        onSelect={() => onServiceSelect(pkg.name, pkg.price)}
                    />
                    
                    <div className="FeaturesList">
                        {pkg.features.map((feature, featureIndex) => (
                            <FeatureRow 
                                key={featureIndex}
                                feature={feature}
                                isIncluded={feature.included}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PackageGrid; 