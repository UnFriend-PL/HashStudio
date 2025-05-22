import { BsRobot } from 'react-icons/bs';
import styles from './AIChat.module.css';

const ChatTrigger = ({ onClick }) => {
    return (
        <button className={styles.ChatTrigger} onClick={onClick} title="Chat with AI Assistant">
            <BsRobot />
        </button>
    );
};

export default ChatTrigger; 