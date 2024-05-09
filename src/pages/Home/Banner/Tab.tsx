import { ReactNode } from "react"

type TabProps = {
    tab: string,
    currentTab: string,
    className?: string,
    children?: ReactNode,
}

const Tab = ({ tab, currentTab, className, children }:TabProps) => {
    return (
        <>
            {tab === currentTab
                ? <div className={`pt-10 px-20 pb-16 ${className}`}>{children}</div>
                : null}
        </>
    )
}

export default Tab