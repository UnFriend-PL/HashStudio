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
            }, 3000);
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
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                exit: { scale: 0, rotate: 180 }
            }
        },
        {
            number: '02',
            title: t('collaboration.steps.planning.title'),
            description: t('collaboration.steps.planning.description'),
            icon: <RiFileList3Line />,
            animation: {
                initial: { x: -100, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                exit: { x: 100, opacity: 0 }
            }
        },
        {
            number: '03',
            title: t('collaboration.steps.development.title'),
            description: t('collaboration.steps.development.description'),
            icon: <RiCodeLine />,
            animation: {
                initial: { y: 100, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                exit: { y: -100, opacity: 0 }
            }
        },
        {
            number: '04',
            title: t('collaboration.steps.review.title'),
            description: t('collaboration.steps.review.description'),
            icon: <RiEyeLine />,
            animation: {
                initial: { scale: 0, rotate: 180 },
                animate: { scale: 1, rotate: 0 },
                exit: { scale: 0, rotate: -180 }
            }
        },
        {
            number: '05',
            title: t('collaboration.steps.launch.title'),
            description: t('collaboration.steps.launch.description'),
            icon: <RiRocketLine />,
            animation: {
                initial: { y: -100, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                exit: { y: 100, opacity: 0 }
            }
        }
    ];

    return (
        <div className="CollaborationProcessScreen">
            <motion.div 
                className="ProcessPanel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div 
                    className="ProcessTitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1>{t('collaboration.title')}</h1>
                    <p>{t('collaboration.subtitle')}</p>
                </motion.div>

                <div className="ProcessContainer">
                    <div className="ProcessControls">
                        <button 
                            className={`ControlButton ${isPlaying ? 'active' : ''}`}
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
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
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    onHoverStart={() => setIsPlaying(false)}
                                    onHoverEnd={() => setIsPlaying(true)}
                                >
                                    <div className="StepIcon">
                                        {steps[activeStep].icon}
                                    </div>
                                    <div className="StepContent">
                                        <span className="StepNumber">{steps[activeStep].number}</span>
                                        <h3>{steps[activeStep].title}</h3>
                                        <p>{steps[activeStep].description}</p>
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
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CollaborationProcessScreen; 