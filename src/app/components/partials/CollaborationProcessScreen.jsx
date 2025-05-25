import { useTranslation } from 'react-i18next';
import '@/app/styles/CollaborationProcessScreen.scss';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaRegHandshake  } from "react-icons/fa6";
import { RiFileList3Line, RiCodeLine, RiEyeLine, RiRocketLine } from 'react-icons/ri';

const CollaborationProcessScreen = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const steps = [
        {
            number: '01',
            title: t('collaboration.steps.consultation.title'),
            description: t('collaboration.steps.consultation.description'),
            icon: <FaRegHandshake />
        },
        {
            number: '02',
            title: t('collaboration.steps.planning.title'),
            description: t('collaboration.steps.planning.description'),
            icon: <RiFileList3Line />
        },
        {
            number: '03',
            title: t('collaboration.steps.development.title'),
            description: t('collaboration.steps.development.description'),
            icon: <RiCodeLine />
        },
        {
            number: '04',
            title: t('collaboration.steps.review.title'),
            description: t('collaboration.steps.review.description'),
            icon: <RiEyeLine />
        },
        {
            number: '05',
            title: t('collaboration.steps.launch.title'),
            description: t('collaboration.steps.launch.description'),
            icon: <RiRocketLine />
        }
    ];

    return (
        <div className="CollaborationProcessScreen">
            <div className="ProcessPanel">
                <motion.div 
                    className="ProcessTitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1>{t('collaboration.title')}</h1>
                    <p>{t('collaboration.subtitle')}</p>
                </motion.div>

                <div className="StepsContainer">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="StepCard"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="StepNumber">{step.number}</div>
                            <div className="StepIcon">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollaborationProcessScreen; 