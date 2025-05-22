import { BsRobot, BsPerson } from 'react-icons/bs';

const ChatMessage = ({ message, isLoading }) => {
    if (isLoading) {
        return (
            <div className="Message ai">
                <div className="MessageIcon">
                    <BsRobot />
                </div>
                <div className="MessageContent">
                    <div className="LoadingDots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`Message ${message.type}`}>
            <div className="MessageIcon">
                {message.type === 'ai' ? <BsRobot /> : <BsPerson />}
            </div>
            {message.type === 'ai' ? (
                <div className="MessageContent" dangerouslySetInnerHTML={{ __html: message.content }} />
            ) : (
                <div className="MessageContent">{message.content}</div>
            )}
        </div>
    );
};

export default ChatMessage; 