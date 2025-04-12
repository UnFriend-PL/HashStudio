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
import {FaGithub} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import {TbWorldWww} from "react-icons/tb"
import avatar from "@/app/assets/avatar_szymon.png"

const portfolioData1 = [
    {
        src: studioIMG.src,
        alt: 'Studio Kobiet Włocławek',
        dataFollowText: 'Studio Kobiet Włocławek',
        description: 'Strona wizytówka w połączeniu z sekcją prezentacji oferty wykonana dla studia kobiet we Włocławku.',
        ico: <FaGithub/>,
        link: "https://github.com/UnFriend-PL"
    },
    {
        src: bankIMG.src,
        alt: 'Bank Symulator',
        dataFollowText: 'Bank Symulator',
        description: 'Symulator bankowości online. Aplikacja została napisana z użyciem React + Vite + .Net, oferuje funkcjonalności takie jak: Panel admina, przelewy między kontrami, przewalutowania, tworzenei kont, kont walutowych, kont wspólnych, akceptacja wniosków i wysyłanie wiadomości.',
        ico: <FaGithub/>,
        link: "https://github.com/UnFriend-PL"
    },
    {
        src: inz.src,
        alt: 'FizjoPanel',
        dataFollowText: 'FizjoPanel',
        description: 'Aplikacja ułatwiająca prace fizjoteraputów poprzez planner wizyt, prowadzenie historii leczenia, wizualizacje bólu partii ciała oraz możliwość prowadzenia bloga. Utworzona z użyciem React + Nextjs + .Net',
        ico: <FaGithub/>,
        link: "https://github.com/UnFriend-PL"
    },
    {
        src: smarcinkowski.src,
        alt: 'Strona CV',
        dataFollowText: 'Strona CV',
        description: 'Aplikacja utworzona w NextJs. Strona mająca na celu stworzenie CV w wersji online.',
        ico: <TbWorldWww/>,
        link: "https:/smarcinkowski.pl/"
    }
];

const aboutMeTextList = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
];
const skills = [".Net", "C#", "React", "NextJs", "SQL", "Docker", "CI/CD", "Azure"]

const links1 = [
    {
        name: 'Github',
        ico: <FaGithub/>,
        link: "https://github.com/UnFriend-PL"
    },
    {
        name: 'Github',
        ico: <FaLinkedin/>,
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
                                <Portfolio images={portfolioData1} links={links1} skills={skills} avatar={avatar}
                                           aboutMeTextList={aboutMeTextList}/>
                            </div>
                            <div className={styles.portfolioSection}>
                                <Portfolio images={portfolioData1}/>
                            </div>
                        </section>
                    </main>
                </ParallaxProvider>
            )}
        </>
    );
}
