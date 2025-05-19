import { useState } from "react";
import CategoryHeader from './CategoryHeader';
import PackageGrid from './PackageGrid';

const ServiceCategory = ({ category, onServiceSelect, selectedServices }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isSelected = selectedServices.some(service => service.category === category.name);

    return (
        <div className="ServiceCategory">
            <CategoryHeader 
                title={category.name}
                description={category.description}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
                isSelected={isSelected}
            />
            <PackageGrid 
                packages={category.packages}
                isExpanded={isExpanded}
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