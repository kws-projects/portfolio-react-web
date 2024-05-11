import { ReactNode } from "react"

type SectionProps = {
    title?: string,
    description?: string,
    className?: string,
    style?: Object,
    showBreakline?: boolean,
    children?: ReactNode
}

const Section = ({ title, description, className, style, showBreakline=true, children }:SectionProps) => {
    return (
        <div 
            className={`self-center flex flex-col justify-start items-center ${showBreakline&&'border-t border-gray-200'} pt-12 pb-24 mx-0 md:mx-14 lg:mx-28 max-w-screen-lg ${className}`} 
            style={{...style, width: '-webkit-fill-available'}}
        >
            {title 
                ? <p className={`text-2xl ${!description&&'pb-10'}`}>{title}</p>
                : null
            }

            {description 
                ? <p className="pt-2 pb-10">{description}</p>
                : null
            }

            {children}
        </div>
    )
}

export default Section