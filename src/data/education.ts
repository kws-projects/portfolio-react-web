import { TimelineItem, Localized } from '@/types/timeline'
import { envConfig } from '@/config'

type ItemContent = {
  title: string
  subTitle: string
  description?: string
}

const IMG_CITYU = `${envConfig.STATIC_FILE_BASE_URL}/images/education/cityu.webp`
const IMG_UOW = `${envConfig.STATIC_FILE_BASE_URL}/images/education/uow.webp`

const items: {
  id: number
  image: string
  fromDate: string
  toDate: string
  content: Localized<ItemContent>
}[] = [
  {
    id: 0,
    image: IMG_CITYU,
    fromDate: '2020-09-01T00:00:00+08:00',
    toDate: '2022-10-01T00:00:00+08:00',
    content: {
      en: {
        title: 'City University of Hong Kong',
        subTitle:
          'Bechelor of Arts and Science in New Media (BAS), Intermedia/Multimedia',
        description: `GPA 3.7, First class honours\nWith awards dean's list (semester B 2020 - 2021, semester A 2021 - 2022)`,
      },
      'zh-TW': {
        title: '香港城市大學',
        subTitle: '新媒體文理學士（BAS），互動媒體/多媒體',
        description: `GPA 3.7，甲等榮譽\n獲院長嘉許名單（2020-2021學年B學期、2021-2022學年A學期）`,
      },
      ja: {
        title: '香港城市大学',
        subTitle:
          'ニューメディア文理学士（BAS）、インターメディア/マルチメディア',
        description: `GPA 3.7、一等優等\n学部長表彰（2020-2021年度B学期、2021-2022年度A学期）`,
      },
      ar: {
        title: 'جامعة هونغ كونغ سيتي',
        subTitle:
          'بكالوريوس الآداب والعلوم في الإعلام الجديد، الوسائط المتعددة',
        description: `معدل تراكمي 3.7، مرتبة الشرف الأولى\nقائمة العميد (الفصل الدراسي B 2020-2021، الفصل الدراسي A 2021-2022)`,
      },
    },
  },
  {
    id: 1,
    image: IMG_UOW,
    fromDate: '2018-09-01T00:00:00+08:00',
    toDate: '2020-06-01T00:00:00+08:00',
    content: {
      en: {
        title: 'UOW College',
        subTitle:
          'Associate of Science in Creative and Interactive Media Production, Intermedia/Multimedia',
      },
      'zh-TW': {
        title: 'UOW College',
        subTitle: '創意及互動媒體製作副理學士，互動媒體/多媒體',
      },
      ja: {
        title: 'UOW College',
        subTitle:
          'クリエイティブ＆インタラクティブメディア制作準学士、インターメディア/マルチメディア',
      },
      ar: {
        title: 'UOW College',
        subTitle:
          'دبلوم مشارك في إنتاج الوسائط الإبداعية والتفاعلية، الوسائط المتعددة',
      },
    },
  },
]

export const getEducation = (lang: string): TimelineItem[] =>
  items.map(item => {
    const c = item.content[lang] ?? item.content.en
    return {
      id: item.id,
      image: item.image,
      fromDate: item.fromDate,
      toDate: item.toDate,
      title: c.title,
      subTitle: c.subTitle,
      description: c.description,
    }
  })

export const education = getEducation('en')
