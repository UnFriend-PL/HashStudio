import { useTranslation } from 'react-i18next';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

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

export default CategoryHeader; 