'use client';

import React, {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import '@/app/[locale]/styles/ParallaxScrollScreen.scss';
import Fireflies from "@/app/[locale]/decorators/Fireflies";

const ParallaxScrollScreen = ({children, videoSrc, className = ''}) => {
    const targetRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: targetRef,
        offset: ["0.1 1", "1 0.1"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.5, 1, 1, 1, 0.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
    const topValue = useTransform(scrollYProgress, [0, 0.2, 0.2, 1], ["0", "-10vh", "-12", "-12vh"]);

    return (
        <div ref={targetRef} className={`parallax-scroll-page ${className}`}>
            <motion.div className="sticky-container">
                <motion.div className="content" style={{scale, opacity, top: topValue}}>
                    {children}
                </motion.div>
            </motion.div>
            <Fireflies count={40}/>

        </div>
    );
};

export default ParallaxScrollScreen;
