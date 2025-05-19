import { useState } from "react";
import { useTranslation } from 'react-i18next';
import CategoryHeader from './CategoryHeader';
import PackageGrid from './PackageGrid';

const ServiceCategory = ({ category, onServiceSelect, selectedServices }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const isSelected = selectedServices.some(service => service.category === category.name);

    return (
        <div className="ServiceCategory">
            <CategoryHeader 
                title={t(`categories.${category.name}`) || category.name}
                description={t(`categories.${category.name}_desc`) || category.description}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
                isSelected={isSelected}
            />
            <PackageGrid 
                packages={category.packages}
                isExpanded={isExpanded}
                category={category}
                onServiceSelect={(packageName, price) => {
                    onServiceSelect({
                        category: category.name,
                        packageName,
                        price
                    });
                }}
                selectedServices={selectedServices}
            />
        </div>
    );
};

export default ServiceCategory; 