import React, {useState} from "react";
import styles from "@/app/styles/Portfolio.module.scss";
import {FaChevronLeft, FaChevronRight, FaCode, FaMobile, FaDesktop, FaServer, FaDatabase} from "react-icons/fa";
import {IoClose} from "react-icons/io5";
import AboutMe from "@/app/components/partials/AbouotMe";
import {motion} from "framer-motion";

const Portfolio = ({data}) => {
    const {images, about, skills} = data;
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        {id: 'all', icon: <FaCode/>, label: 'All Projects'},
        {id: 'web', icon: <FaDesktop/>, label: 'Web Development'},
        {id: 'mobile', icon: <FaMobile/>, label: 'Mobile Apps'},
        {id: 'backend', icon: <FaServer/>, label: 'Backend'},
        {id: 'database', icon: <FaDatabase/>, label: 'Database'}
    ];

    const openModal = (index) => setSelectedIndex(index);
    const closeModal = () => setSelectedIndex(null);
    const nextImage = () => setSelectedIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;
    const filteredImages = activeCategory === 'all'
        ? images
        : images.filter(image => image.categories && image.categories.includes(activeCategory));

    return (
        <section className={styles.portfolioContainer}>
            <AboutMe links={about.links} avatar={about.avatar} skills={skills}>
                {about.textList &&
                    about.textList.map((text, index) => (
                        <p key={index} className={styles.text}>
                            {text}
                        </p>
                    ))}
            </AboutMe>

            <div className={styles.categories}>
                {categories.map(category => (
                    <motion.button
                        key={category.id}
                        className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <span className={styles.icon}>{category.icon}</span>
                        <span className={styles.label}>{category.label}</span>
                    </motion.button>
                ))}
            </div>

            <div className={styles.imageGrid}>
                {filteredImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className={styles.imageItem}
                        onClick={() => openModal(index)}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        whileHover={{y: -10}}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                data-follow={image.dataFollowText}
                                loading="lazy"
                            />
                            <a>
                                <div className={styles.imageOverlay}>
                                    <h3>{image.dataFollowText}</h3>
                                    <p>{image.description}</p>
                                    <div className={styles.projectCategories}>
                                        {image.categories && image.categories.map(categoryId => {
                                            const category = categories.find(cat => cat.id === categoryId);
                                            return category ? (
                                                <span key={categoryId} className={styles.categoryTag}>
                                                {category.icon}
                                                    {category.label}
                                            </span>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            </a> 
                        </div>
                    </motion.div>
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
                                    <a target="_blank" href={selectedImage.link} rel="noreferrer">
                                        {selectedImage.ico}
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>
                                {selectedImage.dataFollowText}
                            </div>
                            <p>{selectedImage.description}</p>
                        </div>

                        <div className={styles.modalControls}>
                            <button onClick={prevImage}>
                                <FaChevronLeft/>
                            </button>
                            <button onClick={nextImage}>
                                <FaChevronRight/>
                            </button>
                            <button onClick={closeModal}>
                                <IoClose/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
