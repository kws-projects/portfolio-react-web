import { ReactNode } from 'react'

type TabProps = {
  tab: string
  currentTab: string
  className?: string
  style?: object
  children?: ReactNode
}

const Tab = ({ tab, currentTab, className, style, children }: TabProps) => {
  if (tab !== currentTab) return null

  return (
    <div className={`pt-10 px-8 sm:px-20 pb-16 ${className}`} style={style}>
      {children}
    </div>
  )
}

export default Tab
