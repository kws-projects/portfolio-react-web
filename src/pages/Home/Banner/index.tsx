import { useTranslation } from 'react-i18next'
import HomeBackgroundSketch from '../../../components/sketches/HomeBackgroundSketch'
import Card from './Card'

const Banner = () => {
    const { t } = useTranslation()

    return (
        <>
            <HomeBackgroundSketch />

            <section className="flex flex-col justify-start" >
                <p 
                    className="self-center max-w-screen-lg pt-14 md:pt-28 pl-0 md:pl-36 text-2xl md:text-4xl font-medium leading-snug text-center md:text-left" 
                    style={{width: '-webkit-fill-available'}} 
                >{t('home_banner_greetings')}</p>

                <Card />
            </section>
        </>
        
    )
}

export default Banner