import {ParallaxBanner, ParallaxBannerLayer} from 'react-scroll-parallax';
import "@/app/styles/Welcome.scss";
import pin from "@/app/assets/pin.svg"
import Image from "next/image";
import Fireflies from "@/app/decorators/Fireflies";
import {items} from "@/app/components/Menu"

export default function WelcomeScreen() {
    return (
        <>
            <ParallaxBanner style={{height: '100vh'}}>
                <Fireflies count={50} />

                <ParallaxBannerLayer
                    image="/images/parrallax/window.svg"
                    speed={-50}
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
                <ParallaxBannerLayer
                    image="/images/parrallax/hand.svg"
                    speed={-50}
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center'

                    }}
                    className={"waving"}
                />
                <ParallaxBannerLayer
                    image="/images/parrallax/flashing_welcome.svg"
                    speed={-50}
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
                <ParallaxBannerLayer
                    image="/images/parrallax/guy.svg"
                    speed={-50}
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
                <ParallaxBannerLayer
                    image="/images/parrallax/girl_light_off.svg"
                    speed={-80}
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        left: '-3vw'
                    }}
                />
                <ParallaxBannerLayer
                    image="/images/parrallax/flashing_bulb.svg"
                    speed={-80}
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        left: '-3vw'
                    }}
                    className={"flashing"}
                />
                <ParallaxBannerLayer
                    image="/images/parrallax/logo_tagline.svg"
                    speed={-20}
                    style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',}}
                />
                <ParallaxBannerLayer>
                    <div className={"pinsContainer"}>
                        {items.map((item, index) =>
                            <div className="pin" key={index}>
                                <a href={""}> <Image src={pin} alt="pin"/>
                                </a>
                            </div>
                        )}
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>

        </>
    )
}
