import styles from "@/app/styles/partials/AboutMe.module.scss"
import Image from "next/image";
import {useState} from "react";

export default function AboutMe({children, links, avatar}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className={styles.aboutMe}>
            <div className={styles.content}>
                <div className={styles.avatar}>
                    <div className={styles.avatarImage}>
                        {avatar && (<Image src={avatar} alt={"avatar"} loading={"lazy"}/>)}
                    </div>
                </div>
                <div className={styles.getMore}>
                    <a>Dowiedz się więcej...</a>
                </div>
                <div className={styles.text}>
                    {children}
                </div>
            </div>
            <div className={`${styles.links} ${links ? `${styles.visible}` : ''}`}>
                {links && links.map((link, index) => (
                    <a key={index} href={link.link} className={styles.link} target="_blank"
                       rel="noreferrer">{link.ico}</a>
                ))}
            </div>
        </section>
    );
}