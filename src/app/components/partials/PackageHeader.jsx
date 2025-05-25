import { useTranslation } from 'react-i18next';
import { BsCheckLg } from "react-icons/bs";

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

export default PackageHeader; 