import { ReactNode } from "react"

type Month = 'Jan' | 'Feb' | 'March' | 'Apr' | 'May' | 'June' | 'July' | 'Aug' | 'Sept' | 'Oct' | 'Nov' | 'Dec'

export interface ITimelineItem {
    id: number,
    image?: string,
    title: string,
    description?: string,
    subItems?: ITimelineItem[],
    fromDate?: {
        month: Month,
        year: number,
    },
    toDate?: {
        month: Month,
        year: number,
    },
    customDate?: string,
}

type TimelineListProps = {
    children: ReactNode
}

export const TimelineList = ({ children }: TimelineListProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

export const TimelineItem = () => {
    return (
        <div>TimelineItem</div>
    )
}