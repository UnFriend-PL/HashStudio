import { useTranslation } from 'react-i18next';
import PackageHeader from './PackageHeader';
import FeatureRow from './FeatureRow';

const PackageGrid = ({ packages, isExpanded, onServiceSelect, selectedServices }) => {
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
                        isSelected={selectedServices.some(service => 
                            service.packageName === pkg.name &&
                            service.category === (pkg.category || '')
                        )}
                        onSelect={() => onServiceSelect(pkg.name, pkg.price)}
                    />
                ))}
            </div>
            <div className="Features">
                {packages[0].features.map((_, featureIndex) => (
                    <FeatureRow 
                        key={featureIndex} 
                        featureIndex={featureIndex}
                        packages={packages}
                        selectedServices={selectedServices}
                    />
                ))}
            </div>
        </div>
    );
};

export default PackageGrid; 