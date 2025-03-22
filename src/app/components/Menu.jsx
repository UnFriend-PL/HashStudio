'use client';

import { useRef, useState, useEffect, createRef } from 'react';
import gsap from 'gsap';
import './Menu.scss';

const items = [
    { name: 'Welcome', color: '#f44336', href: '#welcome', sectionId: 'welcome' },
    { name: 'Design', color: '#e91e63', href: '#design', sectionId: 'design' },
    { name: 'Portfolio', color: '#9c27b0', href: '#', sectionId: 'portfolio' },
    { name: 'Freelance', color: '#673ab7', href: '#', sectionId: 'freelance' },
    { name: 'Contact', color: '#3f51b5', href: '#', sectionId: 'contact' },
];

const AnimatedMenu = () => {
    const rootRef = useRef();
    const indicator1Ref = useRef();
    const indicator2Ref = useRef();
    const itemRefs = useRef(items.map(() => createRef()));
    const [active, setActive] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries.find(entry => entry.isIntersecting);
                if (visibleEntry) {
                    const index = items.findIndex(item => item.sectionId === visibleEntry.target.id);
                    if (index !== -1) setActive(index);
                }
            },
            { threshold: 0.1 }
        );

        items.forEach(item => {
            const section = document.getElementById(item.sectionId);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const animate = () => {
        const menuOffset = rootRef.current.getBoundingClientRect();
        const activeItem = itemRefs.current[active].current;
        if (!activeItem) return;

        const { width, height, top, left } = activeItem.getBoundingClientRect();

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
        gsap.to(indicator2Ref.current, { ...settings, duration: 1 });
    };

    useEffect(() => {
        animate();
        window.addEventListener('resize', animate);
        return () => window.removeEventListener('resize', animate);
    }, [active]);

    return (
        <div ref={rootRef} className="menu">
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
            <div ref={indicator1Ref} className="indicator" />
            <div ref={indicator2Ref} className="indicator" />
        </div>
    );
};

export default AnimatedMenu;
