import { useTranslation } from 'react-i18next';
import '@/app/styles/CollaborationProcessScreen.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaRegHandshake } from "react-icons/fa6";
import { RiFileList3Line, RiCodeLine, RiEyeLine, RiRocketLine } from 'react-icons/ri';

const CollaborationProcessScreen = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveStep(prev => (prev === null || prev === 4) ? 0 : prev + 1);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const steps = [
        {
            number: '01',
            title: t('collaboration.steps.consultation.title'),
            description: t('collaboration.steps.consultation.description'),
            icon: <FaRegHandshake />,
            animation: {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 }
            }
        },
        {
            number: '02',
            title: t('collaboration.steps.planning.title'),
            description: t('collaboration.steps.planning.description'),
            icon: <RiFileList3Line />,
            animation: {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 20 }
            }
        },
        {
            number: '03',
            title: t('collaboration.steps.development.title'),
            description: t('collaboration.steps.development.description'),
            icon: <RiCodeLine />,
            animation: {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 1.05 }
            }
        },
        {
            number: '04',
            title: t('collaboration.steps.review.title'),
            description: t('collaboration.steps.review.description'),
            icon: <RiEyeLine />,
            animation: {
                initial: { opacity: 0, rotate: -5 },
                animate: { opacity: 1, rotate: 0 },
                exit: { opacity: 0, rotate: 5 }
            }
        },
        {
            number: '05',
            title: t('collaboration.steps.launch.title'),
            description: t('collaboration.steps.launch.description'),
            icon: <RiRocketLine />,
            animation: {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 }
            }
        }
    ];

    return (
        <div className="CollaborationProcessScreen">
            <motion.div 
                className="ProcessPanel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <motion.div 
                    className="ProcessTitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <h1>{t('collaboration.title')}</h1>
                    <p>{t('collaboration.subtitle')}</p>
                </motion.div>

                <div className="ProcessContainer">
                    <div className="ProcessControls">
                        <motion.button 
                            className={`ControlButton ${isPlaying ? 'active' : ''}`}
                            onClick={() => setIsPlaying(!isPlaying)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </motion.button>
                    </div>

                    <div className="ProcessSteps">
                        <AnimatePresence mode="wait">
                            {activeStep !== null && (
                                <motion.div
                                    key={activeStep}
                                    className="StepCard"
                                    initial={steps[activeStep].animation.initial}
                                    animate={steps[activeStep].animation.animate}
                                    exit={steps[activeStep].animation.exit}
                                    transition={{ 
                                        duration: 0.8,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    onHoverStart={() => setIsPlaying(false)}
                                    onHoverEnd={() => setIsPlaying(true)}
                                >
                                    <motion.div 
                                        className="StepIcon"
                                        whileHover={{ 
                                            scale: 1.05,
                                            rotate: 5,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        {steps[activeStep].icon}
                                    </motion.div>
                                    <div className="StepContent">
                                        <motion.span 
                                            className="StepNumber"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {steps[activeStep].number}
                                        </motion.span>
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {steps[activeStep].title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {steps[activeStep].description}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="StepIndicators">
                        {steps.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`StepIndicator ${index === activeStep ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveStep(index);
                                    setIsPlaying(false);
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CollaborationProcessScreen; 