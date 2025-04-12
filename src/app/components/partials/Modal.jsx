import styles from "@/app/styles/partials/Modal.module.scss";

export default function Modal() {

    const closeModal = () => {
    }

    return (
        <div className={styles.modal} onClick={closeModal}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
            </div>
        </div>
    )
}