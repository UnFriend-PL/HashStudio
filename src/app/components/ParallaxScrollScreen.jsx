'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxScrollScreen.scss';
import VideoCanvasBackground from './VideoCanvasBackground';
import Fireflies from "@/app/decorators/Fireflies";

const ParallaxScrollScreen = ({ children, videoSrc, className = '' }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.5, 1, 1, 1, 0.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

    return (
        <div ref={targetRef} className={`parallax-scroll-page ${className}` }>
            <Fireflies count={40} />

            {/*{videoSrc && <VideoCanvasBackground src={videoSrc} />}*/}
            <motion.div className="sticky-container">
                <motion.div className="content" style={{ scale, opacity }}>
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ParallaxScrollScreen;
