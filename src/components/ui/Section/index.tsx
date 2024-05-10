import { ReactNode } from "react"

type SectionProps = {
    children: ReactNode
}

const Section = ({ children }:SectionProps) => {
    return (
        <div>
            {children}
        </div>
    )
}