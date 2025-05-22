import { useTranslation } from 'react-i18next';
import { BsCheckLg } from "react-icons/bs";
import '@/app/utils/offer-components/styles/PackageHeader.scss';

const PackageHeader = ({ name, price, isSelected, onSelect }) => {
    const { t } = useTranslation();
    return (
        <div className="PackageHeader">
            <h3>{t(name)}</h3>
            <div className="Price">
                <span className="Currency">PLN</span>
                {price}
            </div>
            <div className="TimeEstimate">{t('offer.estimatedTime')}</div>
            <button 
                className={`SelectButton ${isSelected ? 'selected' : ''}`}
                onClick={onSelect}
            >
                {isSelected ? t('offer.selected') : t('offer.select')}
            </button>
        </div>
    );
};

export default PackageHeader; 