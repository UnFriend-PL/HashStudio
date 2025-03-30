"use client";

import {useEffect, useState} from 'react';
import {ParallaxProvider} from "react-scroll-parallax";
import WelcomeScreen from "@/app/[locale]/components/WelcomeScreen";
import Cursor from "@/app/[locale]/decorators/Cursor";
import ParallaxScrollScreen from "@/app/[locale]/components/ParallaxScrollScreen";
import Menu from "@/app/[locale]/components/Menu";
import {usePathname} from 'next/navigation';

import TextFit from "@/app/[locale]/decorators/TextFit";
import styles from "@/app/[locale]/styles/Main.module.scss";
import Preloader from '@/app/[locale]/components/Preloader';
import Portfolio from "@/app/[locale]/components/Portfolio";

import studioIMG from "@/app/[locale]/assets/studio_kobiet.jpg";
import bankIMG from "@/app/[locale]/assets/bank.jpg";
import inz from "@/app/[locale]/assets/inz.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const portfolioData1 = [
    {src: studioIMG.src, alt: 'Strona 1', dataFollowText: 'Strona 1', description: 'Opis 1', ico: <FaGithub />, link: "https://github.com/UnFriend-PL"},
    {src: bankIMG.src, alt: 'Bank Symulator', dataFollowText: 'Strona 2', description: 'Opis 2', ico: <FaGithub />, link: "https://github.com/UnFriend-PL"},
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
        ico: <FaLinkedin />,
        link: "https://www.linkedin.com/in/smarcinkowski/"
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
