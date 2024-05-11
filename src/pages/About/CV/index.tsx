import { useTranslation } from 'react-i18next'
import { AiOutlineUser } from "react-icons/ai"

const CV = () => {
    const { t } = useTranslation()

    return (
        <div className="absolute top-0 left-0 w-full h-full z-50" >
            <div className="flex justify-between w-full h-full" >
                <div className="flex flex-col justify-start items-start h-full bg-gray-300" style={{width: '40%'}} >
                    Left
                </div>

                <div className="flex flex-col justify-start items-start h-full bg-gray-50" style={{width: '60%'}} >
                    Right
                </div>
            </div>

            <div className="fixed bottom-44 left-20 w-22 flex flex-col justify-center items-center pt-2 px-2 pb-4 rounded-full aspect-square text-sm text-gray-200 bg-gray-900 cursor-pointer">
                <AiOutlineUser size={26} className="fill-gray-200" />
                <div className="text-gray-200">{t('about_cv_button_show')}</div>
            </div>
        </div>
    )
}

export default CV