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
        <div className={`self-center flex flex-col justify-start items-center w-full border-t pt-12 pb-24 border-gray-200 max-w-screen-lg ${className}`} style={style}>
            <p className="text-2xl">{title}</p>
            <p className="pt-2 pb-10">{description}</p>
            {children}
        </div>
    )
}

export default Section