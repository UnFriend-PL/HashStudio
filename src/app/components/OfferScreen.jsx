import "@/app/styles/Offer.scss"
import {CiCircleMinus} from "react-icons/ci";
import {CiCirclePlus} from "react-icons/ci";
import {useState} from "react";
import {MdOutlineExpandMore} from "react-icons/md";
import {MdOutlineExpandLess} from "react-icons/md";

export default function OfferScreen() {

    return (
        <div className="OfferScreen">
            <div className="OfferPanel">
                <Product description={"lorem ipsum dolor lorem ipsum dolor"} title={"Strona typu OnePage"}/>
            </div>
        </div>
    )

}

function Product({title, description}) {

    const [isSelected, setIsSelected] = useState(false);
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="Product">
            <div className="Select">
                <a onClick={() => {
                    setIsSelected(!isSelected)
                }}>{isSelected ? <CiCircleMinus/> : <CiCirclePlus/>}</a>
            </div>
            <div className="Title">
                {title}
            </div>
            <div className="ShowDescription">
                <a>
                    {showMore ? <MdOutlineExpandLess onClick={() => setShowMore(false)}/> :
                        <MdOutlineExpandMore onClick={() => setShowMore(true)}/>}
                </a>
            </div>
            {showMore && (
                <div className="Description">
                    {description}
                </div>
            )}
        </div>
    )

}