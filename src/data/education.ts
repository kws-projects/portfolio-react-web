import { ITimelineItem } from '@/components/ui/Timeline'
import { envConfig } from '@/config'

export const education: ITimelineItem[] = [
  {
    id: 0,
    title: 'City University of Hong Kong',
    subTitle:
      'Bechelor of Arts and Science in New Media (BAS), Intermedia/Multimedia',
    description: `GPA 3.7, First class honours\nWith awards dean's list (semester B 2020 - 2021, semester A 2021 - 2022)`,
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/education/cityu.webp`,
    fromDate: '2020-09-01T00:00:00+08:00',
    toDate: '2022-10-01T00:00:00+08:00',
  },
  {
    id: 1,
    title: 'UOW College',
    subTitle:
      'Associate of Science in Creative and Interactive Media Production, Intermedia/Multimedia',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/education/uow.webp`,
    fromDate: '2018-09-01T00:00:00+08:00',
    toDate: '2020-06-01T00:00:00+08:00',
  },
]
