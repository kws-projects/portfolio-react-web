type Month = 'Jan' | 'Feb' | 'March' | 'Apr' | 'May' | 'June' | 'July' | 'Aug' | 'Sept' | 'Oct' | 'Nov' | 'Dec'

export type TimelineItemType = {
    id: number,
    image: string,
    title: string,
    description?: string,
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

export const TimelineList = () => {
    return (
        <div>Timeline List</div>
    )
}

export const TimelineItem = () => {
    return (
        <div>TimelineItem</div>
    )
}