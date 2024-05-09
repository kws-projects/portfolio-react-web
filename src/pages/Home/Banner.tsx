import { useTranslation } from 'react-i18next'
import HomeBackgroundSketch from '../../components/sketches/HomeBackgroundSketch'
import BannerCard from './BannerCard'

const Banner = () => {
    const { t } = useTranslation()

    return (
        <>
            <HomeBackgroundSketch />

            <section className="flex flex-col justify-start" style={{ height: "970px"}} >
                <p className="self-center max-w-screen-lg pt-28 pl-36 text-4xl font-medium leading-snug" style={{width: '-webkit-fill-available'}} >{t('home_banner_greetings')}</p>

                <BannerCard />
            </section>
        </>
        
    )
}

export default Banner