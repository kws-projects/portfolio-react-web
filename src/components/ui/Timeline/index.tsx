import { ReactNode } from 'react'
import { compareDate } from '../../../utils/common'

export const getDurationString = (fromDate: string, toDate?: string) => {
  const fromDateObj = new Date(fromDate)

  if (!toDate)
    return `${fromDateObj.toLocaleString('default', { month: 'long' })}, ${fromDateObj.getFullYear()} - Present`

  const toDateObj = new Date(toDate)
  return `${fromDateObj.toLocaleString('default', { month: 'long' })}, ${fromDateObj.getFullYear()} - ${toDateObj.toLocaleString('default', { month: 'long' })}, ${toDateObj.getFullYear()}`
}

export interface ITimelineItem {
  id: number
  image?: string
  title: string
  subTitle?: string
  description?: string | ReactNode
  subItems?: ITimelineItem[]
  fromDate?: string
  toDate?: string
  customDate?: string
}

type TimelineListProps = {
  items: ITimelineItem[]
  className?: string
  children?: ReactNode
}

export const TimelineList = ({
  items,
  className,
  children,
}: TimelineListProps) => {
  return (
    <div className={`flex flex-col justify-start w-full ${className}`}>
      {items
        .sort((a, b) => {
          // if from date exists
          if (a.fromDate && b.fromDate)
            return compareDate(a.fromDate, b.fromDate)
          // is custom date is used
          if (a.customDate && b.customDate)
            return compareDate(a.customDate, b.customDate)
          // if from date not exists
          return 0
        })
        .map(experience => (
          <TimelineItem key={experience.id} item={experience} />
        ))}
      {children}
    </div>
  )
}

type TimelineItemProps = {
  item: ITimelineItem
}

export const TimelineItem = ({ item }: TimelineItemProps) => {
  return (
    <>
      <div className="flex items-center w-full space-x-8">
        {item.image && (
          <img className="w-12 sm:w-20" src={item.image} alt="Company" />
        )}

        <div>
          <p className="text-lg font-medium">{item.title}</p>

          {item.subTitle && <p className="font-medium">{item.subTitle}</p>}

          {item.fromDate && !item.toDate && (
            <p className="text-gray-500">{getDurationString(item.fromDate)}</p>
          )}

          {item.fromDate && item.toDate && (
            <p className="text-gray-500">
              {getDurationString(item.fromDate, item.toDate)}
            </p>
          )}

          {item.customDate && (
            <p className="text-gray-500">{item.customDate}</p>
          )}

          {item.description && (
            <p className="text-gray-500 pt-2">{item.description}</p>
          )}
        </div>
      </div>

      {item.subItems ? (
        item.subItems
          .sort((a, b) => {
            // if from date exists
            if (a.fromDate && b.fromDate)
              return compareDate(a.fromDate, b.fromDate)
            // is custom date is used
            if (a.customDate && b.customDate)
              return compareDate(a.customDate, b.customDate)
            // if from date not exists
            return 0
          })
          .map(experience => (
            <div
              className="flex items-center w-full space-x-8 mt-4 mb-4 pl-0 sm:pl-28"
              key={experience.id}
            >
              <div className="flex flex-col justify-start items-center w-12 sm:w-6 h-full pt-2">
                <div
                  className="flex rounded-full bg-gray-300"
                  style={{ width: '5px', height: '5px' }}
                />
                <div
                  className="bg-gray-300 h-full min-h-12"
                  style={{ width: '1px' }}
                />
              </div>

              <div className="pb-2">
                <p className="text-lg font-medium">{experience.title}</p>

                {experience.subTitle && (
                  <p className="font-medium">{experience.subTitle}</p>
                )}

                {experience.fromDate && !experience.toDate && (
                  <p className="text-gray-500">
                    {getDurationString(experience.fromDate)}
                  </p>
                )}

                {experience.fromDate && experience.toDate && (
                  <p className="text-gray-500">
                    {getDurationString(experience.fromDate, experience.toDate)}
                  </p>
                )}

                {experience.customDate && (
                  <p className="text-gray-500">{experience.customDate}</p>
                )}
              </div>
            </div>
          ))
      ) : (
        <br />
      )}
    </>
  )
}
