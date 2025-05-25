import { RiBardFill } from "react-icons/ri";

const ServiceChatButton = ({ onClick }) => {
    return (
        <div className="ServiceChatButtonContainer" onClick={onClick}>
            <button className="ServiceChatButton">
                <RiBardFill />
            </button>
            <span className="ServiceChatText">Ask AI about this service</span>
        </div>
    );
};

export default ServiceChatButton; 