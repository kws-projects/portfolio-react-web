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
        <div className={`w-full ${className}`} style={style}>
            <span>{title}</span>
            <p>{description}</p>
            {children}
        </div>
    )
}

export default Section