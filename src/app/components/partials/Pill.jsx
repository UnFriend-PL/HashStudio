import styles from "@/app/styles/partials/Pill.module.scss";

export default function Pill({color = {}, children}) {
    return (
        <div className={styles.pill} style={{color: color?.textColor, backgroundColor: color?.bgColor}}>
            {children}
        </div>
    );
}
