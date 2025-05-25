'use client';

import {createRef, useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import '../styles/Menu.scss';
import {CiMenuBurger} from "react-icons/ci";
import {IoMdClose} from "react-icons/io";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const AnimatedMenu = () => {
    const { t } = useTranslation();
    const rootRef = useRef(null);
    const indicator1Ref = useRef(null);
    const indicator2Ref = useRef(null);
    const navItemsRef = useRef(null);
    
    const items = [
        {name: t('menu.welcome'), color: '#f44336', href: '#welcome', sectionId: 'welcome'},
        {name: t('menu.design'), color: '#e91e63', href: '#design', sectionId: 'design'},
        {name: t('menu.portfolio'), color: '#9c27b0', href: '#portfolio', sectionId: 'portfolio'},
        {name: t('menu.collaboration'), color: '#673ab7', href: '#collaboration', sectionId: 'collaboration'},
        {name: t('menu.freelance'), color: '#3f51b5', href: '#freelance', sectionId: 'freelance'},
        {name: t('menu.contact'), color: '#2196f3', href: '#contact', sectionId: 'contact'},
    ];
    
    const itemRefs = useRef(items.map(() => createRef()));

    const [active, setActive] = useState(0);
    const [burger, setBurger] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Filter out entries with very low intersection ratio to reduce jitter
                const visibleEntries = entries.filter(entry => entry.intersectionRatio > 0.3);
                
                if (visibleEntries.length > 0) {
                    // Find the section with the highest intersection ratio
                    const mostVisibleEntry = visibleEntries.reduce((max, entry) => {
                        return entry.intersectionRatio > max.intersectionRatio ? entry : max;
                    }, visibleEntries[0]);

                    const index = items.findIndex((item) => item.sectionId === mostVisibleEntry.target.id);
                    if (index !== -1) {
                        setActive(index);
                    }
                }
            },
            {
                // Reduce number of thresholds and increase the minimum visibility required
                threshold: [0.3, 0.5, 0.7, 0.9],
                // Add some margin to make transitions smoother
                rootMargin: '-10% 0px -10% 0px'
            }
        );

        // Only observe sections that exist
        items.forEach((item) => {
            const section = document.getElementById(item.sectionId);
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, [items]);

    const animateIndicator = () => {
        if (!rootRef.current) return;
        const menuOffset = rootRef.current.getBoundingClientRect();
        const activeItem = itemRefs.current[active].current;
        if (!activeItem) return;

        const {width, height, top, left} = activeItem.getBoundingClientRect();

        const settings = {
            x: left - menuOffset.x,
            y: top - menuOffset.y,
            width,
            height,
            backgroundColor: items[active].color,
            ease: 'elastic.out(.7, .7)',
            duration: 0.8,
        };

        gsap.to(indicator1Ref.current, settings);
        gsap.to(indicator2Ref.current, {...settings, duration: 1});
    };

    useEffect(() => {
        animateIndicator();
        window.addEventListener('resize', animateIndicator);
        return () => window.removeEventListener('resize', animateIndicator);
    }, [active]);

    useEffect(() => {
        if (window.innerWidth > 650) return;

        if (burger) {
            gsap.set(navItemsRef.current, {height: 0, opacity: 0});
            gsap.to(navItemsRef.current, {
                duration: 0.5,
                height: 'auto',
                opacity: 1,
                ease: 'power2.out'
            });
            return;
        }
        gsap.to(navItemsRef.current, {
            duration: 0.4,
            height: 0,
            opacity: 0,
            ease: 'power2.in'
        });

    }, [burger]);

    return (
        <div ref={rootRef} className={`menu ${burger ? 'open' : ''}`}>
            <a className="burger" onClick={() => setBurger(!burger)}>
                {burger ? <IoMdClose/> : <CiMenuBurger/>}
            </a>

            <div className="nav-items" ref={navItemsRef}>
                {items.map((item, index) => (
                    <a
                        key={item.name}
                        ref={itemRefs.current[index]}
                        className={`item ${active === index ? 'active' : ''}`}
                        onMouseEnter={() => setActive(index)}
                        href={item.href}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            
            <LanguageSwitcher />

            <div ref={indicator1Ref} className="indicator"/>
            <div ref={indicator2Ref} className="indicator"/>
        </div>
    );
};

export default AnimatedMenu;
