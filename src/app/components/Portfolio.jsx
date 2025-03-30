import React, {useState} from 'react';
import styles from "@/app/styles/Portfolio.module.scss";
import defaultImage from "@/app/assets/cats.png";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {IoClose} from "react-icons/io5";
import Pill from "@/app/components/partials/Pill";

const Portfolio = ({images, topImageSrc, links, skills}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openModal = (index) => setSelectedIndex(index);
    const closeModal = () => setSelectedIndex(null);
    const nextImage = () => setSelectedIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

    return (
        <section className={styles.portfolioContainer}>
            <img
                src={topImageSrc || defaultImage.src}
                alt="character"
                className={styles.topGraphic}
            />
            {links && (
                <div className={`${styles.Links}`}>
                    {links.map((link, index) => (
                        <a target="_blank" key={index} href={link.link}>{link.ico}</a>
                    ))}
                </div>
            )}
            <div className={styles.imageGrid}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={styles.imageItem}
                        onClick={() => openModal(index)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            data-follow={image.dataFollowText}
                            loading="lazy"
                        />
                        <div className={`${styles.linkIcon} ${styles.noMobile}`}>
                            <a target="_blank" key={index} href={image.link}>{image.ico}</a>
                        </div>
                    </div>
                ))}
            </div>

            {skills && (
                <div className={styles.pills}>
                    {skills.map((skill, index) => (
                        <Pill key={index} color={skill.color}>
                            {skill}
                        </Pill>
                    ))}
                </div>
            )}
            {selectedImage && (
                <div className={styles.modal} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalImageWrapper}>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className={styles.zoomImage}
                            />
                            {selectedImage.link && (
                                <div className={styles.linkIcon}>
                                    <a target="_blank" href={selectedImage?.link}>{selectedImage?.ico}</a>
                                </div>)
                            }
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>{selectedImage.dataFollowText}</div>
                            <p>{selectedImage.description}</p>
                        </div>

                        <div className={styles.modalControls}>
                            <button onClick={prevImage}><FaChevronLeft/></button>
                            <button onClick={nextImage}><FaChevronRight/></button>
                            <button onClick={closeModal}><IoClose/></button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
