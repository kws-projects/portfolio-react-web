import { ReactNode } from "react"

type TabProps = {
    tab: string,
    currentTab: string,
    children?: ReactNode,
}

const Tab = ({ tab, currentTab, children }:TabProps) => {
    return (
        <>
            {tab === currentTab ? children : null}
        </>
    )
}

export default Tab