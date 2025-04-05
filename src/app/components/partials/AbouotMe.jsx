import styles from "@/app/styles/partials/AboutMe.module.scss"
import Image from "next/image";

export default function AboutMe({children, links, avatar}) {

    console.log(links);
    return (
        <section className={styles.aboutMe}>
            <div className={styles.content}>
                <div className={styles.avatarImage}>
                    {avatar && (<Image src={avatar} alt={"avatar"} loading={"lazy"}/>)}
                    {/*{avatar}*/}
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