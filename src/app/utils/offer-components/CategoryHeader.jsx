import { useTranslation } from 'react-i18next';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

const CategoryHeader = ({ title, description, isExpanded, onToggle, isSelected }) => {
    const { t } = useTranslation();
    return (
        <div className="CategoryHeaderWrapper">
            <div 
                className={`CategoryHeader ${isExpanded ? 'expanded' : ''} ${isSelected ? 'selected' : ''}`} 
                onClick={onToggle}
                role="button"
            >
                <div className="CategoryTitle">
                    <h2>{title}</h2>
                    {description && <p>{description}</p>}
                </div>
                {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
            </div>
        </div>
    );
};

export default CategoryHeader; 