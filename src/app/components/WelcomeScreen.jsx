"use client"
import {useEffect, useRef} from 'react';
import GirlLightOffSVG from '@/app/assets/girl_light_off.svg';
import FlashingBulbSVG from '@/app/assets/flashing_bulb.svg';
import GuySVG from '@/app/assets/guy.svg';
import HandSVG from '@/app/assets/hand.svg';
import FlashingWelcomeSVG from '@/app/assets/flashing_welcome.svg';
import WindowSvg from '@/app/assets/window.svg';
import LogoTaglineSVG from '@/app/assets/logo_tagline.svg';
import "@/app/styles/Welcome.scss";
import Fireflies from "@/app/decorators/Fireflies";

export default function WelcomeScreen() {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            containerRef.current.querySelectorAll('.parallax-element').forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0;
                const translateY = scrollY * speed;
                el.style.transform = `translateY(${translateY}px)`;
            });

            const logoTagline = containerRef.current.querySelector('.logo-tagline');
            if (logoTagline) {
                const fadeStart = 0;
                const fadeEnd = 100;
                const opacity = scrollY <= fadeStart
                    ? 1
                    : Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
                logoTagline.style.opacity = opacity;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="WelcomeContainer">
            <div className="parallax-element window" data-speed="0.6">
                <WindowSvg className="base-image"/>
            </div>
            <div className="parallax-element guy" data-speed="0.5">
                <GuySVG className="base-image"/>
                <HandSVG aria-hidden="true" className="overlay-hand waving"/>
                <FlashingWelcomeSVG className="overlay-welcome"/>
            </div>

            <div className="parallax-element woman " data-speed="0.9">
                <GirlLightOffSVG className="base-image"/>
                <FlashingBulbSVG aria-hidden="true"
                                 className="overlay-bulb flashing"/>
            </div>
            <div className="parallax-element logo-tagline" data-speed="0.1">
                <LogoTaglineSVG className="base-image"/>
            </div>
            <Fireflies count={50} style={{zIndex: "-1"}}/>
        </div>
    );
}
