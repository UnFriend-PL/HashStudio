import "@/app/styles/Offer.scss"
import { useState } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { offerData } from "@/app/data/offerData";

const PackageHeader = ({ name, price }) => (
    <div className="PackageCell">
        <h3>{name}</h3>
        <div className="Price">${price}</div>
    </div>
);

const FeatureRow = ({ featureIndex, packages }) => {
    const featureName = packages[0].features[featureIndex].name;
    return (
        <div className="FeatureRow">
            <div className="FeatureCell">{featureName}</div>
            {packages.map((pkg, index) => (
                <div key={index} className="PackageCell">
                    {pkg.features[featureIndex].included ? 
                        <BsCheckLg className="included" /> : 
                        <BsXLg className="not-included" />}
                </div>
            ))}
        </div>
    );
};

const CategoryHeader = ({ title, isExpanded, onToggle }) => (
    <div 
        className={`CategoryHeader ${isExpanded ? 'expanded' : ''}`} 
        onClick={onToggle}
        role="button"
    >
        <h2>{title}</h2>
        {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
    </div>
);

const PackageGrid = ({ packages, isExpanded }) => (
    <div className={`PackagesGrid ${isExpanded ? 'expanded' : ''}`}>
        <div className="PackageHeaders">
            <div className="FeatureCell"></div>
            {packages.map((pkg, index) => (
                <PackageHeader key={index} name={pkg.name} price={pkg.price} />
            ))}
        </div>
        <div className="Features">
            {packages[0].features.map((_, featureIndex) => (
                <FeatureRow 
                    key={featureIndex} 
                    featureIndex={featureIndex}
                    packages={packages}
                />
            ))}
        </div>
    </div>
);

const ServiceCategory = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="ServiceCategory">
            <CategoryHeader 
                title={data.category}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
            />
            <PackageGrid 
                packages={data.packages}
                isExpanded={isExpanded}
            />
        </div>
    );
};

export default function OfferScreen() {
    return (
        <div className="OfferScreen">
            <div className="OfferPanel">
                {Object.values(offerData).map((categoryData, index) => (
                    <ServiceCategory key={index} data={categoryData} />
                ))}
            </div>
        </div>
    );
}