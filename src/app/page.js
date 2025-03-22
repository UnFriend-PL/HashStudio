"use client";
import {ParallaxProvider} from "react-scroll-parallax";
import WelcomeScreen from "@/app/components/WelcomeScreen";
import Cursor from "@/app/decorators/Cursor";

export default function Home() {
    return (
        <>
            <Cursor></Cursor>
            <ParallaxProvider>
                <WelcomeScreen/>
            </ParallaxProvider>
        </>
    );
}
