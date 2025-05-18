import { useState } from "react";
import CategoryHeader from './CategoryHeader';
import PackageGrid from './PackageGrid';

const ServiceCategory = ({ data, isSelected, selectedPackageIndex, onPackageSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="ServiceCategory">
            <CategoryHeader 
                title={data.category}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
                isSelected={isSelected}
            />
            <PackageGrid 
                packages={data.packages}
                isExpanded={isExpanded}
                selectedPackageIndex={selectedPackageIndex}
                onPackageSelect={onPackageSelect}
            />
        </div>
    );
};

export default ServiceCategory; 