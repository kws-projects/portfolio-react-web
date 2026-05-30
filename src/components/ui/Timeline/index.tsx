import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { dayjs } from '@/utils/dayjs'
import {
  sortByDate,
  getDateTimeDifference,
  getDurationString,
} from '@/utils/common'
import { TimelineItem } from '@/types/timeline'

export type { TimelineItem }

type TimelineListProps = {
  items: TimelineItem[]
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
      {sortByDate(items).map(item => (
        <TimelineItemRow key={item.id} item={item} />
      ))}
      {children}
    </div>
  )
}

type TimelineItemRowProps = {
  item: TimelineItem
}

const TimelineItemRow = ({ item }: TimelineItemRowProps) => {
  const { t } = useTranslation()

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
            <p className="text-gray-500 flex flex-wrap gap-x-2">
              <span className="text-gray-500 whitespace-nowrap">
                {getDurationString(item.fromDate)}
              </span>
              {item?.showDateTimeDifference && (
                <span className="text-gray-500 whitespace-nowrap">
                  <span className="text-gray-500 pr-2">-</span>
                  {getDateTimeDifference(dayjs(item.fromDate), { t })}
                </span>
              )}
            </p>
          )}

          {item.fromDate && item.toDate && (
            <p className="text-gray-500 flex flex-wrap gap-x-2">
              <span className="text-gray-500 whitespace-nowrap">
                {getDurationString(item.fromDate, item.toDate)}
              </span>
              {item?.showDateTimeDifference && (
                <span className="text-gray-500 whitespace-nowrap">
                  <span className="text-gray-500 pr-2">-</span>
                  {getDateTimeDifference(dayjs(item.fromDate), {
                    toDateTime: dayjs(item.toDate),
                    t,
                  })}
                </span>
              )}
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
        sortByDate(item.subItems).map(subItem => (
          <div
            className="flex items-center w-full space-x-8 mt-4 mb-4 pl-0 sm:pl-28"
            key={subItem.id}
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
              <p className="text-lg font-medium">{subItem.title}</p>

              {subItem.subTitle && (
                <p className="font-medium">{subItem.subTitle}</p>
              )}

              {subItem.fromDate && !subItem.toDate && (
                <p className="text-gray-500">
                  {getDurationString(subItem.fromDate)}
                </p>
              )}

              {subItem.fromDate && subItem.toDate && (
                <p className="text-gray-500">
                  {getDurationString(subItem.fromDate, subItem.toDate)}
                </p>
              )}

              {subItem.customDate && (
                <p className="text-gray-500">{subItem.customDate}</p>
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
