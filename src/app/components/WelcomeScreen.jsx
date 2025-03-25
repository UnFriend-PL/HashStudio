import {ParallaxBanner, ParallaxBannerLayer} from 'react-scroll-parallax';
import TextBlock from "@/app/components/TextBlock";
import "@/app/styles/Welcome.scss";
import Fireflies from "@/app/decorators/Fireflies";
import VideoCanvasBackground from "@/app/components/VideoCanvasBackground";

export default function WelcomeScreen() {
    return (
        <>
            <ParallaxBanner style={{aspectRatio: '2 / 1', height: '100vh'}}>

                <ParallaxBannerLayer
                    sticky={{start: 0, end: 1}}
                >
                    <div className="WelcomeContainer">
                        <div className="WelcomeBlock">
                            <h1 style={{fontSize: '3rem', color: 'white'}}>Welcome</h1>
                        </div>
                        <VideoCanvasBackground src={"/videos/fog.mp4"} />
                    </div>
                </ParallaxBannerLayer>
                <ParallaxBannerLayer
                    image="/images/bulb.png"
                    speed={-80}
                    style={{backgroundSize: ''}}
                />

            </ParallaxBanner>

        </>
    )
}
