import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import "@/app/styles/Welcome.scss";
import pin from "@/app/assets/pin.svg";
import Image from "next/image";
import Fireflies from "@/app/decorators/Fireflies";
import { items } from "@/app/components/Menu";
import logo_tagline from "@/app/assets/logo_tagline.svg";
import windowImg from "@/app/assets/window.svg";
import handImg from "@/app/assets/hand.svg";
import flashingWelcomeImg from "@/app/assets/flashing_welcome.svg";
import guyImg from "@/app/assets/guy.svg";
import girlLightOffImg from "@/app/assets/girl_light_off.svg";
import flashingBulbImg from "@/app/assets/flashing_bulb.svg";

export default function WelcomeScreen() {
    return (
        <ParallaxBanner style={{ height: '100vh' }}>
            <Fireflies count={50} />

            <ParallaxBannerLayer speed={-50}>
                <Image
                    src={windowImg}
                    alt="window"
                    fill
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                />
            </ParallaxBannerLayer>

            <ParallaxBannerLayer speed={-50}>
                <Image
                    src={flashingWelcomeImg}
                    alt="welcome"
                    fill
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                />
            </ParallaxBannerLayer>

            <ParallaxBannerLayer speed={-50}>
                <Image
                    src={handImg}
                    alt="hand"
                    fill
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                    className={"waving"}
                />
                <Image
                    src={guyImg}
                    alt="guy"
                    fill
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                />
            </ParallaxBannerLayer>

            <ParallaxBannerLayer speed={-80}>
                <div style={{ position: 'relative', width: '100%', height: '100%', left: '-3vw' }}>
                    <Image
                        src={girlLightOffImg}
                        alt="girl"
                        fill
                        style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                        }}
                    />
                </div>
            </ParallaxBannerLayer>

            <ParallaxBannerLayer speed={-80} className="flashing">
                <div style={{ position: 'relative', width: '100%', height: '100%', left: '-3vw' }}>
                    <Image
                        src={flashingBulbImg}
                        alt="bulb"
                        fill
                        style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                        }}
                    />
                </div>
            </ParallaxBannerLayer>

            <ParallaxBannerLayer>
                <div className="logo-tagline">
                    <Image src={logo_tagline} alt="tag_line" />
                </div>
            </ParallaxBannerLayer>
        </ParallaxBanner>
    );
}
