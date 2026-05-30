import { TimelineItem, Localized } from '@/types/timeline'
import { envConfig } from '@/config'

type SubItemContent = {
  title: string
  tasks: string[]
}

type ItemContent = {
  title: string
  description: string
  subItems: SubItemContent[]
}

const IMG_DELOITTE = `${envConfig.STATIC_FILE_BASE_URL}/images/workExperience/deloitte.webp`
const IMG_LALAMOVE = `${envConfig.STATIC_FILE_BASE_URL}/images/workExperience/lalamove.webp`

const items: {
  id: number
  image: string
  fromDate: string
  toDate?: string
  showDateTimeDifference: boolean
  subItemDates: { id: number; fromDate: string; toDate?: string }[]
  content: Localized<ItemContent>
}[] = [
  {
    id: 0,
    image: IMG_DELOITTE,
    fromDate: '2022-06-01T00:00:00+08:00',
    toDate: '2024-02-01T00:00:00+08:00',
    showDateTimeDifference: true,
    subItemDates: [
      {
        id: 1,
        fromDate: '2022-06-01T00:00:00+08:00',
        toDate: '2022-12-01T00:00:00+08:00',
      },
      {
        id: 2,
        fromDate: '2023-01-01T00:00:00+08:00',
        toDate: '2024-02-01T00:00:00+08:00',
      },
    ],
    content: {
      en: {
        title: 'Deloitte Digital - Customer & Marketing - Consulting',
        description:
          'Worked on enterprise-level web applications for banking and insurance clients. Built responsive dashboards, integrated RESTful APIs, and contributed to design system components used across multiple projects.',
        subItems: [
          {
            title: 'Intern',
            tasks: [
              'Contributed to frontend development using React and TypeScript',
              'Implemented UI components and fixed bugs across multiple projects',
              'Participated in code reviews and sprint planning',
            ],
          },
          {
            title: 'Analyst',
            tasks: [
              'Led frontend development for client projects in banking and insurance',
              'Architected reusable component libraries and design system tokens',
              'Optimized build pipelines reducing CI/CD times by 40%',
              'Mentored junior developers and conducted technical onboarding',
            ],
          },
        ],
      },
      'zh-TW': {
        title: '德勤數碼 - 客戶與市場策略 - 諮詢',
        description:
          '參與銀行和保險客戶的企業級網頁應用程式開發。建設響應式儀表板、整合 RESTful API，並為多個專案使用的設計系統組件做出貢獻。',
        subItems: [
          {
            title: '實習生',
            tasks: [
              '使用 React 和 TypeScript 參與前端開發',
              '實現 UI 組件並修復多個專案中的問題',
              '參與代碼審查和敏捷開發衝刺規劃',
            ],
          },
          {
            title: '分析師',
            tasks: [
              '主導銀行和保險客戶專案的前端開發',
              '設計可重用的組件庫和設計系統樣式',
              '優化構建流程，將 CI/CD 時間縮短 40%',
              '指導初級開發人員並進行技術培訓',
            ],
          },
        ],
      },
      ja: {
        title:
          'デロイト デジタル - カスタマー＆マーケティング - コンサルティング',
        description:
          '銀行・保険クライアント向けのエンタープライズWebアプリケーション開発に従事。レスポンシブダッシュボードの構築、RESTful APIの統合、複数プロジェクトで使用されるデザインシステムコンポーネントの開発に貢献。',
        subItems: [
          {
            title: 'インターン',
            tasks: [
              'React と TypeScript を使用したフロントエンド開発に貢献',
              '複数プロジェクトにわたる UI コンポーネントの実装とバグ修正',
              'コードレビューとスプリントプランニングに参加',
            ],
          },
          {
            title: 'アナリスト',
            tasks: [
              '銀行・保険クライアントプロジェクトのフロントエンド開発をリード',
              '再利用可能なコンポーネントライブラリとデザインシステムトークンを設計',
              'ビルドパイプラインを最適化し、CI/CD 時間を 40% 短縮',
              'ジュニア開発者の指導と技術オンボーディングを実施',
            ],
          },
        ],
      },
    },
  },
  {
    id: 3,
    image: IMG_LALAMOVE,
    fromDate: '2024-05-01T00:00:00+08:00',
    showDateTimeDifference: true,
    subItemDates: [{ id: 4, fromDate: '2024-05-16T00:00:00+08:00' }],
    content: {
      en: {
        title: 'Lalamove',
        description:
          'Building and maintaining fullstack features for a logistics platform serving millions of users across Asia. Working with React, Node.js, Kotlin, and cloud infrastructure.',
        subItems: [
          {
            title: 'Fullstack Software Engineer',
            tasks: [
              'Developing end-to-end features across web and backend services',
              'Working with microservices architecture and event-driven systems',
              'Building and maintaining CI/CD pipelines and monitoring dashboards',
              'Contributing to platform reliability and performance optimization',
            ],
          },
        ],
      },
      'zh-TW': {
        title: 'Lalamove',
        description:
          '為服務亞洲數百萬用戶的物流平台構建和維護全端功能。使用 React、Node.js、Kotlin 及雲端基礎設施。',
        subItems: [
          {
            title: '全端軟體工程師',
            tasks: [
              '開發跨網頁和後端服務的端到端功能',
              '使用微服務架構和事件驅動系統',
              '構建和維護 CI/CD 流程及監控儀表板',
              '參與平台可靠性和效能優化',
            ],
          },
        ],
      },
      ja: {
        title: 'Lalamove',
        description:
          'アジア全域で数百万人のユーザーにサービスを提供する物流プラットフォームのフルスタック機能を構築・保守。React、Node.js、Kotlin、クラウドインフラを活用。',
        subItems: [
          {
            title: 'フルスタックソフトウェアエンジニア',
            tasks: [
              'Webおよびバックエンドサービス全体のエンドツーエンド機能を開発',
              'マイクロサービスアーキテクチャとイベント駆動システムに携わる',
              'CI/CD パイプラインと監視ダッシュボードの構築・保守',
              'プラットフォームの信頼性とパフォーマンス最適化に貢献',
            ],
          },
        ],
      },
    },
  },
]

export const getWorkExperiences = (lang: string): TimelineItem[] =>
  items.map(item => {
    const c = item.content[lang] ?? item.content.en
    return {
      id: item.id,
      image: item.image,
      fromDate: item.fromDate,
      toDate: item.toDate,
      showDateTimeDifference: item.showDateTimeDifference,
      title: c.title,
      description: c.description,
      subItems: item.subItemDates.map((sub, i) => ({
        id: sub.id,
        fromDate: sub.fromDate,
        toDate: sub.toDate,
        title: c.subItems[i].title,
        tasks: c.subItems[i].tasks,
      })),
    }
  })

export const workExperiences = getWorkExperiences('en')
