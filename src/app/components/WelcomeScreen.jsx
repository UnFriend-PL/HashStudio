import {ParallaxBanner, ParallaxBannerLayer} from 'react-scroll-parallax';
import TextBlock from "@/app/components/TextBlock";

export default function WelcomeScreen() {
    return (
        <main>
            <ParallaxBanner style={{aspectRatio: '2 / 1', height: '100vh'}}>
                <ParallaxBannerLayer
                    image="/images/background.png"
                    speed={30}
                    style={{backgroundSize: 'cover'}}
                />
                <ParallaxBannerLayer
                    image="/images/mountains.png"
                    speed={-80}
                    style={{backgroundSize: 'cover'}}
                />
                <ParallaxBannerLayer
                    image="/images/jungle1.png"
                    speed={60}
                    style={{backgroundSize: 'cover'}}
                />

                <ParallaxBannerLayer
                    sticky={{start: 0, end: 1}}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}>
                        <h1 style={{fontSize: '3rem', color: 'white'}}>Welcome</h1>
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
    <section>
        <TextBlock/>
    </section>
</main>
)
    ;
}
