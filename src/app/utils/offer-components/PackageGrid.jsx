import { useTranslation } from 'react-i18next';
import PackageHeader from './PackageHeader';
import FeatureRow from './FeatureRow';

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

export default PackageGrid; 