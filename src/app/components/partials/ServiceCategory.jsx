import { useState } from "react";
import { useTranslation } from 'react-i18next';
import CategoryHeader from './CategoryHeader';
import PackageGrid from './PackageGrid';
import ServiceChatButton from './ServiceChatButton';
import { useChatContext } from '@/app/context/ChatContext';

const ServiceCategory = ({ category, onChatOpen }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const { selectedServices, setSelectedServices } = useChatContext();

    const isSelected = selectedServices.some(service => service.category === category.name);

    return (
        <div className="ServiceCategory">
            <CategoryHeader 
                title={t(`categories.${category.name}`) || category.name}
                description={t(`categories.${category.name}_desc`) || category.description}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
                isSelected={isSelected}
            >
                <ServiceChatButton onClick={() => onChatOpen(category)} />
            </CategoryHeader>
            <PackageGrid 
                packages={category.packages}
                isExpanded={isExpanded}
                category={category}
                onServiceSelect={(packageName, price) => {
                    setSelectedServices(prev => {
                        const exists = prev.find(s => 
                            s.category === category.name && 
                            s.packageName === packageName
                        );
                        if (exists) {
                            return prev.filter(s => 
                                !(s.category === category.name && 
                                s.packageName === packageName)
                            );
                        }
                        return [...prev, { category: category.name, packageName, price }];
                    });
                }}
                selectedServices={selectedServices}
            />
        </div>
    );
};

export default ServiceCategory; 