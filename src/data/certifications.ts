import { TimelineItem, Localized } from '@/types/timeline'
import { envConfig } from '@/config'

type ItemContent = {
  title: string
  subTitle: string
  customDate: string
}

const IMG_AWS = `${envConfig.STATIC_FILE_BASE_URL}/images/certifications/aws-ccp.webp`

const items: {
  id: number
  image: string
  content: Localized<ItemContent>
}[] = [
  {
    id: 0,
    image: IMG_AWS,
    content: {
      en: {
        title: 'AWS Certified Cloud Practitioner',
        subTitle: 'Amazon Web Services (AWS)',
        customDate: 'Issued April, 2024 - Expires April, 2027',
      },
      'zh-TW': {
        title: 'AWS 認證雲端從業人員',
        subTitle: 'Amazon Web Services (AWS)',
        customDate: '頒發日期：2024年4月 - 有效期至：2027年4月',
      },
      ja: {
        title: 'AWS 認定クラウドプラクティショナー',
        subTitle: 'Amazon Web Services (AWS)',
        customDate: '取得：2024年4月 - 有効期限：2027年4月',
      },
    },
  },
]

export const getCertifications = (lang: string): TimelineItem[] =>
  items.map(item => {
    const c = item.content[lang] ?? item.content.en
    return {
      id: item.id,
      image: item.image,
      title: c.title,
      subTitle: c.subTitle,
      customDate: c.customDate,
    }
  })

export const certifications = getCertifications('en')
