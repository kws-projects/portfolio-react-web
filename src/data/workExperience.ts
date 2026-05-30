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
          'Delivered cross-platform applications and CRM solutions for enterprise clients in retail and F&B, serving hundreds of thousands of end users. Progressed from intern to analyst, taking on client-facing responsibilities and production leadership.',
        subItems: [
          {
            title: 'Intern',
            tasks: [
              'Collaborated with developers and designers to build a mobile app (Android, iOS) for an F&B company serving 700,000+ users',
              'Maintained and enhanced mobile app and backend services for seamless functionality',
              'Delivered regular updates and feature improvements to optimize user experience',
              'Resolved production issues across frontend and backend, ensuring minimal downtime',
            ],
          },
          {
            title: 'Analyst',
            tasks: [
              'Developed Android, iOS, and WeChat Mini-program shopper apps and Salesforce CRM for a shopping mall loyalty program with 70,000+ users',
              'Defined technical requirements and drove implementation of new features and changes',
              'Led production support as primary owner, ensuring stable operation of frontend and backend systems',
              'Hosted daily standups and aligned requirements directly with clients, streamlining communication and delivery',
              'Built the Deloitte Digital Day 2023 event website, enhancing the experience for 300+ C-suite and partner guests with event info, activity booking, and check-in features',
              'Maintained 100% utilization rate for over a year',
            ],
          },
        ],
      },
      'zh-TW': {
        title: '德勤數碼 - 客戶與市場策略 - 諮詢',
        description:
          '為零售及餐飲企業客戶交付跨平台應用程式及 CRM 解決方案，服務數十萬終端用戶。從實習生晉升為分析師，承擔客戶溝通及生產環境管理職責。',
        subItems: [
          {
            title: '實習生',
            tasks: [
              '與開發團隊及設計師合作，為一家擁有 70 萬用戶的餐飲企業開發行動應用程式（Android、iOS）',
              '維護和改進行動應用及後端服務，確保功能穩定運作',
              '定期推出更新和功能改進以優化用戶體驗',
              '排查前端及後端的生產環境問題，確保最少停機時間',
            ],
          },
          {
            title: '分析師',
            tasks: [
              '為商場會員計劃開發 Android、iOS 及微信小程式購物應用和 Salesforce CRM，服務 7 萬多名用戶',
              '制定技術需求並主導新功能及變更的實施',
              '作為主要負責人領導生產環境支援，確保前後端系統穩定運行',
              '主持每日站會並與客戶直接對齊需求，精簡溝通和交付流程',
              '開發 Deloitte Digital Day 2023 活動網站，為 300 多名高管和合作夥伴嘉賓提供活動資訊、活動預訂和簽到功能',
              '連續一年以上保持 100% 利用率',
            ],
          },
        ],
      },
      ja: {
        title:
          'デロイト デジタル - カスタマー＆マーケティング - コンサルティング',
        description:
          '小売・飲食業界の企業クライアント向けにクロスプラットフォームアプリケーションとCRMソリューションを提供し、数十万人のエンドユーザーにサービスを提供。インターンからアナリストに昇格し、クライアント対応や本番環境の管理責任を担う。',
        subItems: [
          {
            title: 'インターン',
            tasks: [
              '開発者とデザイナーと協力し、70万人以上のユーザーを持つ飲食企業向けモバイルアプリ（Android、iOS）を開発',
              'モバイルアプリとバックエンドサービスの保守・改善を実施',
              '定期的なアップデートと機能改善によりユーザー体験を最適化',
              'フロントエンドおよびバックエンドの本番課題を解決し、最小限のダウンタイムを実現',
            ],
          },
          {
            title: 'アナリスト',
            tasks: [
              '7万人以上のユーザーを持つショッピングモールロイヤルティプログラム向けに、Android、iOS、WeChatミニプログラムのショッパーアプリとSalesforce CRMを開発',
              '技術要件を定義し、新機能と変更の実装を推進',
              '本番サポートのリードとして、フロントエンドおよびバックエンドシステムの安定稼働を確保',
              'デイリースタンドアップを主催し、クライアントと直接要件を調整してコミュニケーションと納品を効率化',
              'Deloitte Digital Day 2023イベントサイトを構築し、300名以上のCxOおよびパートナーゲストにイベント情報、アクティビティ予約、チェックイン機能を提供',
              '1年以上にわたり稼働率100%を維持',
            ],
          },
        ],
      },
      ar: {
        title: 'ديلويت ديجيتال - العملاء والتسويق - الاستشارات',
        description:
          'تقديم تطبيقات متعددة المنصات وحلول CRM لعملاء المؤسسات في قطاعي التجزئة والأغذية والمشروبات، لخدمة مئات الآلاف من المستخدمين. الترقي من متدرب إلى محلل مع تحمل مسؤوليات التواصل مع العملاء وإدارة بيئة الإنتاج.',
        subItems: [
          {
            title: 'متدرب',
            tasks: [
              'التعاون مع المطورين والمصممين لبناء تطبيق جوال (Android، iOS) لشركة أغذية ومشروبات تخدم أكثر من 700,000 مستخدم',
              'صيانة وتحسين التطبيق والخدمات الخلفية لضمان الأداء السلس',
              'تقديم تحديثات وتحسينات منتظمة لتحسين تجربة المستخدم',
              'حل مشاكل الإنتاج في الواجهة الأمامية والخلفية مع ضمان الحد الأدنى من وقت التوقف',
            ],
          },
          {
            title: 'محلل',
            tasks: [
              'تطوير تطبيقات Android و iOS وبرنامج WeChat المصغر ونظام Salesforce CRM لبرنامج ولاء مركز تسوق يخدم أكثر من 70,000 مستخدم',
              'تحديد المتطلبات التقنية وقيادة تنفيذ الميزات والتغييرات الجديدة',
              'قيادة دعم الإنتاج كمسؤول رئيسي لضمان استقرار الأنظمة الأمامية والخلفية',
              'إدارة الاجتماعات اليومية والتنسيق المباشر مع العملاء لتبسيط التواصل والتسليم',
              'بناء موقع Deloitte Digital Day 2023 لتحسين تجربة أكثر من 300 ضيف من كبار المسؤولين التنفيذيين',
              'الحفاظ على معدل استخدام 100% لأكثر من عام',
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
          'Building and maintaining fullstack features for a global logistics platform serving millions of users. Shipped compliance-critical features enabling European market expansion, working across React, Node.js, Java, and cloud infrastructure.',
        subItems: [
          {
            title: 'Fullstack Software Engineer',
            tasks: [
              'Deployed to Germany for 2 months to drive GDPR compliance initiatives, enabling the company to operate in the European market',
              'Designed and integrated consent management systems to meet EU regulatory requirements for market launch',
              'Delivered end-to-end features spanning web frontend and backend microservices',
              'Built on microservices architecture and event-driven systems to support high-throughput operations',
              'Maintained CI/CD pipelines and monitoring dashboards to ensure deployment reliability',
              'Contributed to platform performance optimization and system reliability improvements',
            ],
          },
        ],
      },
      'zh-TW': {
        title: 'Lalamove',
        description:
          '為服務全球數百萬用戶的物流平台構建和維護全端功能。交付合規關鍵功能以支持歐洲市場擴展，使用 React、Node.js、Java 及雲端基礎設施。',
        subItems: [
          {
            title: '全端軟體工程師',
            tasks: [
              '派駐德國 2 個月推動 GDPR 合規計劃，助力公司進入歐洲市場',
              '設計和整合同意管理系統，滿足歐盟監管要求以支援市場上線',
              '交付涵蓋網頁前端和後端微服務的端到端功能',
              '基於微服務架構和事件驅動系統支援高吞吐量業務運營',
              '維護 CI/CD 流程及監控儀表板，確保部署穩定性',
              '參與平台效能優化和系統可靠性提升',
            ],
          },
        ],
      },
      ja: {
        title: 'Lalamove',
        description:
          '世界中の数百万人のユーザーにサービスを提供するグローバル物流プラットフォームのフルスタック機能を構築・保守。欧州市場への展開を可能にするコンプライアンス重要機能を提供。React、Node.js、Java、クラウドインフラを活用。',
        subItems: [
          {
            title: 'フルスタックソフトウェアエンジニア',
            tasks: [
              'ドイツに2ヶ月間出張し、GDPRコンプライアンス推進を主導。欧州市場での事業展開を実現',
              '同意管理システムを設計・統合し、EU規制要件を満たして市場ローンチを支援',
              'Webフロントエンドとバックエンドマイクロサービスにまたがるエンドツーエンド機能を提供',
              'マイクロサービスアーキテクチャとイベント駆動システムで高スループット運用を支援',
              'CI/CDパイプラインと監視ダッシュボードを保守し、デプロイの信頼性を確保',
              'プラットフォームのパフォーマンス最適化とシステム信頼性の向上に貢献',
            ],
          },
        ],
      },
      ar: {
        title: 'Lalamove',
        description:
          'بناء وصيانة ميزات شاملة لمنصة لوجستية عالمية تخدم ملايين المستخدمين. تقديم ميزات حيوية للامتثال لتمكين التوسع في السوق الأوروبية، والعمل مع React و Node.js و Java والبنية التحتية السحابية.',
        subItems: [
          {
            title: 'مهندس برمجيات شامل',
            tasks: [
              'الانتقال إلى ألمانيا لمدة شهرين لقيادة مبادرات الامتثال لـ GDPR، مما مكّن الشركة من العمل في السوق الأوروبية',
              'تصميم ودمج أنظمة إدارة الموافقة لتلبية متطلبات الاتحاد الأوروبي التنظيمية',
              'تقديم ميزات شاملة تغطي الواجهة الأمامية والخدمات المصغرة الخلفية',
              'البناء على بنية الخدمات المصغرة والأنظمة القائمة على الأحداث لدعم العمليات عالية الإنتاجية',
              'صيانة خطوط CI/CD ولوحات المراقبة لضمان موثوقية النشر',
              'المساهمة في تحسين أداء المنصة وتعزيز موثوقية النظام',
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
