'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from '@/app/styles/partials/DesignScreen.module.scss';
import { FaMagic, FaCopy, FaCheck } from 'react-icons/fa';

const DesignScreen = () => {
    const { t, i18n } = useTranslation();
    const containerRef = useRef(null);
    const [colorInput, setColorInput] = useState('');
    const [colorPalette, setColorPalette] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copiedColor, setCopiedColor] = useState(null);
    const timeoutRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);

    const handleColorChange = (e) => {
        setColorInput(e.target.value);
        setError(null);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (e.target.value.trim()) getColorInspiration(e.target.value);
        }, 5000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && colorInput.trim()) {
            e.preventDefault();
            getColorInspiration(colorInput);
        }
    };

    const getColorInspiration = async (color) => {
        try {
            setIsLoading(true);
            setError(null);
            setCopiedColor(null);
            const response = await fetch('/api/generate-palette', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    color,
                    maxColors: 3,
                    complementaryColors: 2,
                    language: i18n.language
                }),
            });
            if (!response.ok) throw new Error('Failed to generate color palette');
            const data = await response.json();
            setColorPalette(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetInspire = () => {
        if (colorInput.trim()) getColorInspiration(colorInput);
    };

    const copyToClipboard = (color, index) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(index);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

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

            <div className={styles.colorInspiration}>
                <div className={styles.colorInputContainer}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            value={colorInput}
                            onChange={handleColorChange}
                            onKeyPress={handleKeyPress}
                            placeholder={t('design.colorInput.placeholder')}
                            className={styles.colorInput}
                        />
                        <motion.button
                            onClick={handleGetInspire}
                            className={styles.inspireButton}
                            disabled={isLoading || !colorInput.trim()}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <FaMagic />
                            <span>{t('design.colorInput.getInspire')}</span>
                        </motion.button>
                    </div>
                </div>

                {error && <div className={styles.error}>{error}</div>}
                {isLoading && <div className={styles.loading}>{t('design.colorInput.loading')}</div>}

                {colorPalette && (
                    <div className={styles.paletteFlatContainer}>
                        <div className={styles.flatRow}>
                            {colorPalette.colors.map((color, index) => (
                                <div key={index} className={styles.flatColorBlock}>
                                    <motion.div
                                        className={styles.flatCircle}
                                        style={{ background: color.rgb }}
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <button
                                            className={styles.flatCopyBtn}
                                            onClick={e => { e.stopPropagation(); copyToClipboard(color.rgb, index); }}
                                            title={t('design.colorInput.getInspire')}
                                        >
                                            {copiedColor === index ? <FaCheck /> : <FaCopy />}
                                        </button>
                                    </motion.div>
                                    <div className={styles.flatCode}>{color.rgb}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default DesignScreen; 