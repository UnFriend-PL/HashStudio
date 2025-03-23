"use client";
import {ParallaxProvider} from "react-scroll-parallax";
import WelcomeScreen from "@/app/components/WelcomeScreen";
import Cursor from "@/app/decorators/Cursor";
import ParallaxScrollScreen from "@/app/components/ParallaxScrollScreen";
import Menu from "@/app/components/Menu";

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
                        <ParallaxScrollScreen videoSrc={"videos/hands.mp4"} >
                            This is a parallax scroll screen. The content will scale up and down as you scroll.
                        </ParallaxScrollScreen>
                        <ParallaxScrollScreen>
                            This is a second text.
                        </ParallaxScrollScreen>
                    </div>
                </main>
            </ParallaxProvider>
        </>
    );
}
