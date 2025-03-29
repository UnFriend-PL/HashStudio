"use client";

import {useEffect, useState} from 'react';
import {ParallaxProvider} from "react-scroll-parallax";
import WelcomeScreen from "@/app/components/WelcomeScreen";
import Cursor from "@/app/decorators/Cursor";
import ParallaxScrollScreen from "@/app/components/ParallaxScrollScreen";
import Menu from "@/app/components/Menu";
import {usePathname} from 'next/navigation';

import TextFit from "@/app/decorators/TextFit";
import styles from "@/app/styles/Main.module.scss";
import Preloader from '@/app/components/Preloader';
import Portfolio from "@/app/components/Portfolio";

import studioIMG from "@/app/assets/studio_kobiet.jpg";
import bankIMG from "@/app/assets/bank.jpg";
import inz from "@/app/assets/inz.png";
import { FaGithub } from "react-icons/fa";

const portfolioData1 = [
    {src: studioIMG.src, alt: 'Strona 1', dataFollowText: 'Strona 1', description: 'Opis 1', ico: <FaGithub />, link: "https://github.com/UnFriend-PL"},
    {src: bankIMG.src, alt: 'Strona 2', dataFollowText: 'Strona 2', description: 'Opis 2', ico: <FaGithub />, link: "https://github.com/UnFriend-PL"},
    {src: inz.src, alt: 'Strona 3', dataFollowText: 'Strona 3', description: 'Opis 3', ico: <FaGithub />, link: "https://github.com/UnFriend-PL"}
];
const Links1 = [
    {
        name: 'Github',
        ico: <FaGithub />,
        link: "https://github.com/UnFriend-PL"
    },
    {
        name: 'Github',
        ico: <FaGithub />,
        link: "https://github.com/UnFriend-PL"
    }
]
export default function Home() {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const handleInitialLoad = () => {
            setTimeout(() => setLoading(false), 1500);
        };

        if (document.readyState === 'complete') {
            handleInitialLoad();
        } else {
            window.addEventListener('load', handleInitialLoad);
            return () => window.removeEventListener('load', handleInitialLoad);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            {loading && <Preloader/>}
            {!loading && (
                <ParallaxProvider>
                    <Cursor/>
                    <main>
                        <section id={"welcome"}>
                            <WelcomeScreen/>
                        </section>
                        <Menu/>
                        <section id={"design"}>
                            <ParallaxScrollScreen>
                                <div className={styles.slogan}>
                                    <TextFit minFontSize={50} maxFontSize={150}>
                                        TEXT
                                    </TextFit>
                                </div>
                            </ParallaxScrollScreen>
                        </section>
                        <section id={"portfolio"}>
                            <div className={styles.portfolioSection}>
                                <Portfolio images={portfolioData1} links={Links1}/>
                            </div>
                            <div className={styles.portfolioSection}>
                                <Portfolio images={portfolioData1} />
                            </div>
                        </section>
                    </main>
                </ParallaxProvider>
            )}
        </>
    );
}
