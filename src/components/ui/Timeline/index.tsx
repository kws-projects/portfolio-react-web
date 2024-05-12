import { ReactNode } from "react"

export interface ITimelineItem {
    id: number,
    image?: string,
    title: string,
    description?: string,
    subItems?: ITimelineItem[],
    fromDate?: string,
    toDate?: string,
    customDate?: string,
}

type TimelineListProps = {
    children: ReactNode
}

export const TimelineList = ({ children }: TimelineListProps) => {
    return (
        <div className="">
            {children}
        </div>
    )
}

type TimelineItemProps = {
    item: ITimelineItem
}

export const TimelineItem = ({ item }: TimelineItemProps) => {
    return (
        <div>
            {item.title}
            {item.fromDate}
        </div>
    )
}