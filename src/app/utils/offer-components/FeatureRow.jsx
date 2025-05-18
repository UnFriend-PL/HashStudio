import { useTranslation } from 'react-i18next';
import { BsCheckLg, BsXLg } from "react-icons/bs";

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

export default FeatureRow; 