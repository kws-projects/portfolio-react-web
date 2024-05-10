import { ReactNode } from "react"

type SectionProps = {
    title: string,
    description?: string,
    className?: string,
    style?: Object,
    children?: ReactNode
}

const Section = ({ title, description, className, style, children }:SectionProps) => {
    return (
        <div 
            className={`self-center flex flex-col justify-start items-center border-t pt-12 pb-24 mx-0 md:mx-14 lg:mx-28 border-gray-200 max-w-screen-lg ${className}`} 
            style={{...style, width: '-webkit-fill-available'}}
        >
            <p className="text-2xl">{title}</p>
            <p className="pt-2 pb-10">{description}</p>
            {children}
        </div>
    )
}

export default Section