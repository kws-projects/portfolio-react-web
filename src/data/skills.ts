import { envConfig } from '@/config'

type Skill = {
  id: number
  title: string
  category: 'Frontend' | 'Backend' | 'Cloud'
  image: string
}

export const skills: Skill[] = [
  {
    id: 18,
    title: 'TypeScript',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/typescript.webp`,
  },
  {
    id: 3,
    title: 'React',
    category: 'Frontend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/react.webp`,
  },
  {
    id: 4,
    title: 'Next',
    category: 'Frontend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/next.webp`,
  },
  {
    id: 23,
    title: 'Prisma',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/prisma.webp`,
  },
  {
    id: 5,
    title: 'Tailwind',
    category: 'Frontend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/tailwind.webp`,
  },
  {
    id: 19,
    title: 'Docker',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/docker.webp`,
  },
  {
    id: 7,
    title: 'Kotlin',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/kotlin.webp`,
  },
  {
    id: 9,
    title: 'Swift',
    category: 'Frontend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/swift.webp`,
  },
  {
    id: 10,
    title: 'WeChat Mini-program',
    category: 'Frontend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/mp.webp`,
  },
  {
    id: 11,
    title: 'Node',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/node.webp`,
  },
  {
    id: 12,
    title: 'Express',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/express.webp`,
  },
  {
    id: 20,
    title: 'Nestjs',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/nestjs.webp`,
  },
  {
    id: 21,
    title: 'Jest',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/jest.webp`,
  },
  {
    id: 13,
    title: 'AWS',
    category: 'Cloud',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/aws.webp`,
  },
  {
    id: 14,
    title: 'Alibaba Cloud',
    category: 'Cloud',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/alicloud.webp`,
  },
  {
    id: 15,
    title: 'Java',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/java.webp`,
  },
  {
    id: 22,
    title: 'MySQL',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/mysql.webp`,
  },
  {
    id: 16,
    title: 'Python',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/python.webp`,
  },
  {
    id: 17,
    title: 'Bash',
    category: 'Backend',
    image: `${envConfig.STATIC_FILE_BASE_URL}/images/skills/bash.webp`,
  },
]
