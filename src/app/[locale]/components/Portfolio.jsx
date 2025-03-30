import React, {useState} from 'react';
import styles from "@/app/[locale]/styles/Portfolio.module.scss";
import defaultImage from "@/app/[locale]/assets/cats.png";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {IoClose} from "react-icons/io5";

const Portfolio = ({images, topImageSrc, links}) => {
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
                <div className={styles.Links}>
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
                        <div className={styles.linkIcon}>
                            <a target="_blank" key={index} href={image.link}>{image.ico}</a>
                        </div>
                    </div>
                ))}
            </div>

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
                            })
                        </div>
                        <p>{selectedImage.dataFollowText}</p>
                        <p>{selectedImage.description}</p>
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
