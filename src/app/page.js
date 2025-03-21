"use client";
import {ParallaxProvider} from "react-scroll-parallax";
import WelcomeScreen from "@/app/components/WelcomeScreen";

export default function Home() {
    return (
        <>
            <ParallaxProvider>
                <WelcomeScreen/>
            </ParallaxProvider>
        </>
    );
}
