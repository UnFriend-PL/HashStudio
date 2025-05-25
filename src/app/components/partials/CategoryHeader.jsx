import { useTranslation } from 'react-i18next';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { BsChevronDown } from 'react-icons/bs';

const CategoryHeader = ({ title, description, isExpanded, onToggle, isSelected, children }) => {
    const { t } = useTranslation();
    return (
        <div className="CategoryHeaderWrapper">
            <div className="CategoryHeader" onClick={onToggle}>
                <div className="CategoryInfo">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div className="CategoryActions">
                    {children}
                    <BsChevronDown className={`ChevronIcon ${isExpanded ? 'expanded' : ''}`} />
                </div>
            </div>
        </div>
    );
};

export default CategoryHeader; 