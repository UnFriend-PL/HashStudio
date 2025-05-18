import styles from "@/app/styles/partials/AboutMe.module.scss"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import Pill from "@/app/components/partials/Pill";

export default function AboutMe({children, links, avatar, skills}) {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    return (
        <section className={styles.aboutMe}>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={styles.content}
            >
                <div className={styles.contentInner}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatar}>
                            {avatar && (
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className={styles.avatarImageWrapper}
                                >
                                    <Image 
                                        src={avatar} 
                                        alt="avatar" 
                                        loading="lazy"
                                        className={styles.avatarImage}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                    
                    <div className={styles.textSection}>
                        <div className={styles.text}>
                            {children}
                        </div>
                        
                        <div className={`${styles.links} ${links ? styles.visible : ''}`}>
                            {links && links.map((link, index) => (
                                <motion.a 
                                    key={index} 
                                    href={link.link} 
                                    className={styles.link} 
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    {link.ico}
                                    <span className={styles.linkName}>{link.name}</span>
                                </motion.a>
                            ))}
                        </div>
                        
                        <div className={styles.skillsTitle}>
                            <h3>{t('portfolio.skills.title')}</h3>
                        </div>

                        {skills && skills.length > 0 && (
                            <motion.div 
                                className={styles.skillsContainer}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                {skills.map((skill, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                    >
                                        <Pill>{skill}</Pill>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}