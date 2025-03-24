"use client";
import {ParallaxProvider} from "react-scroll-parallax";
import WelcomeScreen from "@/app/components/WelcomeScreen";
import Cursor from "@/app/decorators/Cursor";
import ParallaxScrollScreen from "@/app/components/ParallaxScrollScreen";
import Menu from "@/app/components/Menu";
import TextFit from "@/app/decorators/TextFit";
import styles from "@/app/styles/Main.module.scss";
export default function Home() {
    return (
        <>
            <ParallaxProvider>
                <Cursor></Cursor>

                <main>
                    <div id={"welcome"}>
                        <WelcomeScreen/>
                    </div>
                    <Menu/>
                    <div id={"design"}>
                        <ParallaxScrollScreen>
                            <div className={styles.slogan}>
                                <TextFit minFontSize={10} maxFontSize={150}>
                                    DESIGN
                                </TextFit>
                                <TextFit minFontSize={10} maxFontSize={150}>
                                    MOJE MARZENIE ZYCIA
                                </TextFit>

                                <TextFit minFontSize={10} maxFontSize={150}>
                                    DESIGN TEST
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
                            </div>                        </ParallaxScrollScreen>
                    </div>
                </main>
            </ParallaxProvider>
        </>
    );
}
