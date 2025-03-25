"use client";

import { useEffect, useState } from 'react';
import { ParallaxProvider } from "react-scroll-parallax";
import WelcomeScreen from "@/app/components/WelcomeScreen";
import Cursor from "@/app/decorators/Cursor";
import ParallaxScrollScreen from "@/app/components/ParallaxScrollScreen";
import Menu from "@/app/components/Menu";
import TextFit from "@/app/decorators/TextFit";
import styles from "@/app/styles/Main.module.scss";
import TextLine from "@/app/decorators/TextLine";
import Preloader from '@/app/components/Preloader';
import { usePathname } from 'next/navigation';

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
            {loading && <Preloader />}
            {!loading && (
                <ParallaxProvider>
                    <Cursor />
                    <main>
                        <div id={"welcome"}>
                            <WelcomeScreen />
                        </div>
                        <Menu />
                        <div id={"design"}>
                            <ParallaxScrollScreen>
                                <div className={styles.slogan}>
                                    <TextFit minFontSize={10} maxFontSize={150}>
                                        <TextLine>PRZYCIĄGAJĄCY UWAGĘ</TextLine>
                                    </TextFit>
                                </div>
                            </ParallaxScrollScreen>
                            <ParallaxScrollScreen>
                                <div className={styles.slogan}>
                                    <TextFit minFontSize={10} maxFontSize={100}>
                                        DESIGN
                                    </TextFit>
                                    <TextFit minFontSize={10} maxFontSize={100}>
                                        MOJE MARZENIE ZYCIA
                                    </TextFit>
                                    <TextFit minFontSize={10} maxFontSize={100}>
                                        DESIGN TEST
                                    </TextFit>
                                </div>
                            </ParallaxScrollScreen>
                        </div>
                    </main>
                </ParallaxProvider>
            )}
        </>
    );
}
