import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { dayjs } from '@/utils/dayjs'
import {
  sortByDate,
  getDateTimeDifference,
  getDurationString,
} from '@/utils/common'
import { TimelineItem } from '@/types/timeline'
import { FiChevronDown } from 'react-icons/fi'

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
    <div className={`flex flex-col w-full max-w-2xl ${className}`}>
      {sortByDate(items).map((item, i) => (
        <TimelineItemRow
          key={item.id}
          item={item}
          isLast={i === items.length - 1}
        />
      ))}
      {children}
    </div>
  )
}

type TimelineItemRowProps = {
  item: TimelineItem
  isLast: boolean
}

const TimelineItemRow = ({ item, isLast }: TimelineItemRowProps) => {
  const { t, i18n } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const hasDetails =
    item.description || (item.subItems && item.subItems.length > 0)

  return (
    <div className="flex gap-5">
      {/* Vertical line and dot */}
      <div className="flex flex-col items-center pt-1.5">
        <div className="w-3 h-3 rounded-full bg-accent border-2 border-bg flex-shrink-0 ring-2 ring-accent/30" />
        {!isLast && <div className="w-px flex-1 bg-border/10 mt-1" />}
      </div>

      {/* Content */}
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-8'}`}>
        <div
          className={`rounded-xl border border-border/8 bg-surface p-5 transition-all duration-200 ${hasDetails ? 'cursor-pointer hover:border-accent/20' : ''}`}
          onClick={() => hasDetails && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start gap-4">
            {item.image && (
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-1 flex-shrink-0"
                src={item.image}
                alt={item.title}
              />
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display font-semibold text-primary text-base">
                  {item.title}
                </h3>
                {hasDetails && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <FiChevronDown className="text-tertiary" size={16} />
                  </motion.div>
                )}
              </div>

              {item.subTitle && (
                <p className="text-secondary text-sm mt-0.5">{item.subTitle}</p>
              )}

              <div className="flex flex-wrap items-center gap-x-2 mt-1.5 text-sm">
                {item.fromDate && (
                  <span className="text-tertiary">
                    {getDurationString(item.fromDate, item.toDate, {
                      locale: i18n.language,
                      t,
                    })}
                  </span>
                )}
                {item.customDate && (
                  <span className="text-tertiary">{item.customDate}</span>
                )}
                {item.fromDate && item.showDateTimeDifference && (
                  <span className="text-accent text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10">
                    {getDateTimeDifference(dayjs(item.fromDate), {
                      toDateTime: item.toDate ? dayjs(item.toDate) : undefined,
                      t,
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Expandable details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {item.description && (
                  <p className="text-secondary text-sm leading-relaxed mt-4 ps-0 sm:ps-16">
                    {item.description}
                  </p>
                )}

                {item.subItems &&
                  sortByDate(item.subItems).map(sub => (
                    <div key={sub.id} className="mt-5 ps-0 sm:ps-16">
                      <p className="font-display font-medium text-primary">
                        {sub.title}
                      </p>
                      {sub.fromDate && (
                        <p className="text-tertiary text-sm mt-0.5">
                          {getDurationString(sub.fromDate, sub.toDate, {
                            locale: i18n.language,
                            t,
                          })}
                        </p>
                      )}
                      {sub.customDate && (
                        <p className="text-tertiary text-sm mt-0.5">
                          {sub.customDate}
                        </p>
                      )}
                      {sub.description && (
                        <p className="text-secondary text-sm leading-relaxed mt-2">
                          {sub.description}
                        </p>
                      )}
                      {sub.tasks && sub.tasks.length > 0 && (
                        <ul className="mt-2 space-y-1.5">
                          {sub.tasks.map((task, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-secondary leading-relaxed"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
