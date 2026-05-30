import { TimelineItem } from '@/types/timeline'
import { envConfig } from '@/config'

export const workExperiences: TimelineItem[] = [
  {
    id: 0,
    title: 'Deloitte Digital - Customer & Marketing - Consulting',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/workExperience/deloitte.webp`,
    fromDate: '2022-06-01T00:00:00+08:00',
    toDate: '2024-02-01T00:00:00+08:00',
    description:
      'Worked on enterprise-level web applications for banking and insurance clients. Built responsive dashboards, integrated RESTful APIs, and contributed to design system components used across multiple projects.',
    subItems: [
      {
        id: 1,
        title: 'Intern',
        fromDate: '2022-06-01T00:00:00+08:00',
        toDate: '2022-12-01T00:00:00+08:00',
        tasks: [
          'Contributed to frontend development using React and TypeScript',
          'Implemented UI components and fixed bugs across multiple projects',
          'Participated in code reviews and sprint planning',
        ],
      },
      {
        id: 2,
        title: 'Analyst',
        fromDate: '2023-01-01T00:00:00+08:00',
        toDate: '2024-02-01T00:00:00+08:00',
        tasks: [
          'Led frontend development for client projects in banking and insurance',
          'Architected reusable component libraries and design system tokens',
          'Optimized build pipelines reducing CI/CD times by 40%',
          'Mentored junior developers and conducted technical onboarding',
        ],
      },
    ],
    showDateTimeDifference: true,
  },
  {
    id: 3,
    title: 'Lalamove',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/workExperience/lalamove.webp`,
    fromDate: '2024-05-01T00:00:00+08:00',
    description:
      'Building and maintaining fullstack features for a logistics platform serving millions of users across Asia. Working with React, Node.js, Kotlin, and cloud infrastructure.',
    subItems: [
      {
        id: 4,
        title: 'Fullstack Software Engineer',
        fromDate: '2024-05-16T00:00:00+08:00',
        tasks: [
          'Developing end-to-end features across web and backend services',
          'Working with microservices architecture and event-driven systems',
          'Building and maintaining CI/CD pipelines and monitoring dashboards',
          'Contributing to platform reliability and performance optimization',
        ],
      },
    ],
    showDateTimeDifference: true,
  },
]
