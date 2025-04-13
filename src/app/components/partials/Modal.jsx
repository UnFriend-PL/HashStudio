import styles from "@/app/styles/partials/Modal.module.scss";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const closeModal = () => {
        onClose();
    };

    return (
        <div className={styles.modal} onClick={closeModal}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}