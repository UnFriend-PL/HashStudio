import { useTranslation } from 'react-i18next';
import { BsCheckLg, BsXLg } from "react-icons/bs";
import '@/app/utils/offer-components/styles/FeatureRow.scss';

const FeatureRow = ({ feature, isIncluded }) => {
    const { t } = useTranslation();
    
    return (
        <div className="FeatureRow">
            <div className="FeatureName">{t(feature.name)}</div>
            <div className="FeatureValue">
                {isIncluded ? (
                    <>
                        <BsCheckLg className="FeatureIcon included" />
                        <span className="FeatureText">{feature.value || t('offer.included')}</span>
                    </>
                ) : (
                    <>
                        <BsXLg className="FeatureIcon excluded" />
                        <span className="FeatureText">{t('offer.notIncluded')}</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default FeatureRow; 