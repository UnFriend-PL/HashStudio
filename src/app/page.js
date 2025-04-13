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
import smarcinkowski from "@/app/assets/smarcinkowski.png";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {TbWorldWww} from "react-icons/tb"
import avatar from "@/app/assets/avatar_szymon.png"

const portfolioData = {
    images: [
        {
            src: studioIMG.src,
            alt: "Studio Kobiet Włocławek",
            dataFollowText: "Studio Kobiet Włocławek",
            description:
                "Strona wizytówka w połączeniu z sekcją prezentacji oferty wykonana dla studia kobiet we Włocławku.",
            ico: <FaGithub/>,
            link: "https://github.com/UnFriend-PL",
        },
        {
            src: bankIMG.src,
            alt: "Bank Symulator",
            dataFollowText: "Bank Symulator",
            description:
                "Symulator bankowości online. Aplikacja została napisana z użyciem React + Vite + .Net, oferuje funkcjonalności takie jak: Panel admina, przelewy między kontami, przewalutowania, tworzenie kont, kont walutowych, kont wspólnych, akceptacja wniosków i wysyłanie wiadomości.",
            ico: <FaGithub/>,
            link: "https://github.com/UnFriend-PL",
        },
        {
            src: inz.src,
            alt: "FizjoPanel",
            dataFollowText: "FizjoPanel",
            description:
                "Aplikacja ułatwiająca pracę fizjoterapeutów – planner wizyt, prowadzenie historii leczenia, wizualizacja bólu oraz możliwość prowadzenia bloga. Utworzona z użyciem React + Next.js + .Net.",
            ico: <FaGithub/>,
            link: "https://github.com/UnFriend-PL",
        },
        {
            src: smarcinkowski.src,
            alt: "Strona CV",
            dataFollowText: "Strona CV",
            description:
                "Aplikacja utworzona w Next.js. Strona służąca jako CV w wersji online.",
            ico: <TbWorldWww/>,
            link: "https://smarcinkowski.pl/",
        },
    ],
    about: {
        textList: [
            "Hi!🚀 I'm here to come up with and execute innovative solutions for you in the digital world.",
            "I specialize in .NET and React technologies, constantly pushing the boundaries to make our projects even better."
        ],
        links: [
            {
                name: "Github",
                ico: <FaGithub/>,
                link: "https://github.com/UnFriend-PL",
            },
            {
                name: "LinkedIn",
                ico: <FaLinkedin/>,
                link: "https://www.linkedin.com/in/smarcinkowski/",
            },
        ],
        avatar: avatar,
    },
    skills: [".Net", "C#", "React", "Next.js", "SQL", "Docker", "CI/CD", "Azure"],
};

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
                                <Portfolio data={portfolioData}/>
                            </div>
                        </section>
                    </main>
                </ParallaxProvider>
            )}
        </>
    );
}
