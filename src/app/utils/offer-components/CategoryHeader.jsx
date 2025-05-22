import { useTranslation } from 'react-i18next';
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { BsChevronDown } from 'react-icons/bs';
import '@/app/utils/offer-components/styles/CategoryHeader.scss';

const CategoryHeader = ({ title, description, isExpanded, onToggle, isSelected, children }) => {
    const { t } = useTranslation();
    return (
        <div className="CategoryHeader" onClick={onToggle}>
            <div className="CategoryIcon">
                {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
            </div>
            <div className="CategoryDetails">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
};

export default CategoryHeader; 