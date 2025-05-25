'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from '@/app/styles/partials/DesignScreen.module.scss';
import { FaPalette, FaCode, FaMobile, FaDesktop, FaServer, FaDatabase } from 'react-icons/fa';

const DesignScreen = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const categories = [
        { id: 'all', icon: <FaPalette />, label: t('design.categories.all') },
        { id: 'frontend', icon: <FaCode />, label: t('design.categories.frontend') },
        { id: 'mobile', icon: <FaMobile />, label: t('design.categories.mobile') },
        { id: 'desktop', icon: <FaDesktop />, label: t('design.categories.desktop') },
        { id: 'backend', icon: <FaServer />, label: t('design.categories.backend') },
        { id: 'database', icon: <FaDatabase />, label: t('design.categories.database') }
    ];

    const projects = [
        {
            id: 1,
            title: t('design.projects.project1.title'),
            description: t('design.projects.project1.description'),
            category: 'frontend',
            image: '/path/to/image1.jpg',
            technologies: ['React', 'Next.js', 'SCSS']
        },
        {
            id: 2,
            title: t('design.projects.project2.title'),
            description: t('design.projects.project2.description'),
            category: 'mobile',
            image: '/path/to/image2.jpg',
            technologies: ['React Native', 'Redux', 'Firebase']
        },
        // Add more projects as needed
    ];

    const filteredProjects = activeCategory === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeCategory);

    return (
        <motion.div 
            ref={containerRef}
            className={styles.designScreen}
            style={{ opacity, scale }}
        >
            <div className={styles.header}>
                <h2>{t('design.title')}</h2>
                <p>{t('design.subtitle')}</p>
            </div>

            <div className={styles.categories}>
                {categories.map(category => (
                    <motion.button
                        key={category.id}
                        className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className={styles.icon}>{category.icon}</span>
                        <span className={styles.label}>{category.label}</span>
                    </motion.button>
                ))}
            </div>

            <div className={styles.projectsGrid}>
                {filteredProjects.map(project => (
                    <motion.div
                        key={project.id}
                        className={styles.projectCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -10 }}
                    >
                        <div className={styles.projectImage}>
                            {/* Add project image here */}
                        </div>
                        <div className={styles.projectInfo}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className={styles.technologies}>
                                {project.technologies.map(tech => (
                                    <span key={tech} className={styles.techTag}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default DesignScreen; 