import { ReactNode } from "react"

type TabProps = {
    tab: string,
    currentTab: string,
    children?: ReactNode,
}

const Tab = ({ tab, currentTab, children }:TabProps) => {
    return (
        <>
            {tab === currentTab
                ? <div className="pt-10 px-20 pb-16">{children}</div>
                : null}
        </>
    )
}

export default Tab