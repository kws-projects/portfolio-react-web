import { ITimelineItem } from '@/components/ui/Timeline'
import { envConfig } from '@/config'

export const certifications: ITimelineItem[] = [
  {
    id: 0,
    title: 'AWS Certified Cloud Practitioner',
    subTitle: 'Amazon Web Services (AWS)',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/certifications/aws-ccp.webp`,
    customDate: 'Issued April, 2024 - Expires April, 2027',
  },
]
