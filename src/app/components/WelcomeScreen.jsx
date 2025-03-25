import {ParallaxBanner, ParallaxBannerLayer} from 'react-scroll-parallax';
import "@/app/styles/Welcome.scss";
import hand from "@/app/assets/hand.svg"
import Image from "next/image";

export default function WelcomeScreen() {
    return (
        <>
            <ParallaxBanner style={{ height: '100vh'}}>
                <ParallaxBannerLayer
                    image="/images/parrallax/guy_without_hand.svg"
                    speed={-50}
                    style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', justifyContent: 'center'}}
                >
                    <Image src={hand} alt={"animated_hand"} className={"waving"}></Image>
                </ParallaxBannerLayer>
                <ParallaxBannerLayer
                    image="/images/parrallax/girl_long.svg"
                    speed={-80}
                    style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', left: '-3vw'}}
                />
                <ParallaxBannerLayer
                    image="/images/parrallax/logo_tagline.svg"
                    speed={-20}
                    style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',}}
                />
            </ParallaxBanner>

        </>
    )
}
