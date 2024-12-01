import { ITimelineItem } from 'components/ui/Timeline'
import { envConfig } from 'config'

export const workExperiences: ITimelineItem[] = [
  {
    id: 0,
    title: 'Deloitte Digital - Customer & Marketing - Consulting',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/workExperience/deloitte.webp`,
    fromDate: '2022-06-01T00:00:00+08:00',
    toDate: '2024-02-01T00:00:00+08:00',
    subItems: [
      {
        id: 1,
        title: 'Intern',
        fromDate: '2022-06-01T00:00:00+08:00',
        toDate: '2022-12-01T00:00:00+08:00',
      },
      {
        id: 2,
        title: 'Analyst',
        fromDate: '2023-01-01T00:00:00+08:00',
        toDate: '2024-02-01T00:00:00+08:00',
      },
    ],
  },
  {
    id: 3,
    title: 'Lalamove',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/workExperience/lalamove.webp`,
    fromDate: '2024-05-01T00:00:00+08:00',
    subItems: [
      {
        id: 4,
        title: 'Fullstack Software Engineer',
        fromDate: '2024-05-16T00:00:00+08:00',
      },
    ],
  },
]
