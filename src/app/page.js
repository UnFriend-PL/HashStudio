"use client";

import {useEffect, useState} from 'react';
import {ParallaxProvider} from "react-scroll-parallax";
import WelcomeScreen from "@/app/components/WelcomeScreen";
import Cursor from "@/app/decorators/Cursor";
import ParallaxScrollScreen from "@/app/components/ParallaxScrollScreen";
import Menu from "@/app/components/Menu";
import {usePathname} from 'next/navigation';
import { useTranslation } from 'react-i18next';

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
import FreelanceScreen from '@/app/components/partials/FreelanceScreen';
import CollaborationProcessScreen from '@/app/components/partials/CollaborationProcessScreen';

export default function Home() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const portfolioData = {
        images: [
            {
                src: studioIMG.src,
                alt: t('portfolio.projects.studio.title'),
                dataFollowText: t('portfolio.projects.studio.title'),
                description: t('portfolio.projects.studio.description'),
                ico: <FaGithub/>,
                link: "https://github.com/UnFriend-PL",
            },
            {
                src: bankIMG.src,
                alt: t('portfolio.projects.bank.title'),
                dataFollowText: t('portfolio.projects.bank.title'),
                description: t('portfolio.projects.bank.description'),
                ico: <FaGithub/>,
                link: "https://github.com/UnFriend-PL",
            },
            {
                src: inz.src,
                alt: t('portfolio.projects.fizjo.title'),
                dataFollowText: t('portfolio.projects.fizjo.title'),
                description: t('portfolio.projects.fizjo.description'),
                ico: <FaGithub/>,
                link: "https://github.com/UnFriend-PL",
            },
            {
                src: smarcinkowski.src,
                alt: t('portfolio.projects.cv.title'),
                dataFollowText: t('portfolio.projects.cv.title'),
                description: t('portfolio.projects.cv.description'),
                ico: <TbWorldWww/>,
                link: "https://smarcinkowski.pl/",
            },
        ],
        about: {
            textList: [
                t('portfolio.about.text1'),
                t('portfolio.about.text2')
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
                    <main style={{ position: 'relative' }}>
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
                        <section data-hide-menu id={"collaboration"} className={styles.collaborationSection}>
                            <CollaborationProcessScreen />
                        </section>
                        <section id={"freelance"} className={styles.freelanceSection}>
                            <FreelanceScreen />
                        </section>
                    </main>
                </ParallaxProvider>
            )}
        </>
    );
}
