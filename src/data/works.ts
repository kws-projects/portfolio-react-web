import { Work, WorkCategory } from '@/constant/work'
import { Localized } from '@/types/timeline'
import { envConfig } from '@/config'

type WorkContent = {
  title: string
  subTitle: string
}

const IMG = (name: string) =>
  `${envConfig.STATIC_FILE_BASE_URL}/images/works/${name}`

const items: {
  id: number
  image: string[]
  category: WorkCategory[]
  stacks?: string[]
  featured?: boolean
  url: string
  date: { year: number; month: number }
  content: Localized<WorkContent>
}[] = [
  {
    id: 23,
    image: [IMG('work-kws-web-tools.webp')],
    category: [WorkCategory.WEBSITE],
    url: 'https://github.com/kwwong1022/kws-web-tools',
    date: { year: 2023, month: 1 },
    content: {
      en: { title: 'Kws WebTools', subTitle: 'Online web tools, AI, Cloud' },
      'zh-TW': { title: 'Kws WebTools', subTitle: '線上網頁工具、AI、雲端' },
      ja: {
        title: 'Kws WebTools',
        subTitle: 'オンラインWebツール、AI、クラウド',
      },
    },
  },
  {
    id: 22,
    image: [IMG('work-gpx-visualization.webp')],
    category: [WorkCategory.TOOL],
    url: '#',
    date: { year: 2022, month: 6 },
    content: {
      en: {
        title: 'GPX Visualization',
        subTitle: 'GPX file to Zwift Info Card Video',
      },
      'zh-TW': { title: 'GPX 視覺化', subTitle: 'GPX 檔案轉 Zwift 資訊卡影片' },
      ja: {
        title: 'GPX ビジュアライゼーション',
        subTitle: 'GPXファイルからZwiftインフォカード動画へ',
      },
    },
  },
  {
    id: 21,
    image: [IMG('work-web-portrait.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/final-project',
    date: { year: 2022, month: 5 },
    content: {
      en: { title: 'Web Portrait', subTitle: 'Extension, Data Portrait' },
      'zh-TW': { title: 'Web Portrait', subTitle: '瀏覽器擴充、數據肖像' },
      ja: { title: 'Web Portrait', subTitle: '拡張機能、データポートレート' },
    },
  },
  {
    id: 20,
    image: [IMG('work-shooting-game-w-ml.webp')],
    category: [WorkCategory.ARDUINO],
    url: 'https://projecthub.arduino.cc/kwwong1022/immersive-shooting-game-w-ml-facial-recognition-d368fb',
    date: { year: 2022, month: 4 },
    content: {
      en: {
        title: 'Shooting Game w/ ML Facial Recognition',
        subTitle: 'Arduino, Game, Machine Learning',
      },
      'zh-TW': {
        title: '射擊遊戲 w/ ML 臉部辨識',
        subTitle: 'Arduino、遊戲、機器學習',
      },
      ja: {
        title: 'シューティングゲーム w/ ML顔認識',
        subTitle: 'Arduino、ゲーム、機械学習',
      },
    },
  },
  {
    id: 19,
    image: [IMG('work-drawing-march-3-2021.webp')],
    category: [WorkCategory.DRAWING],
    url: '/blogs/13',
    date: { year: 2022, month: 2 },
    content: {
      en: { title: 'Digital Drawing', subTitle: 'Digital Drawing, Procreate' },
      'zh-TW': { title: '數位繪畫', subTitle: '數位繪畫、Procreate' },
      ja: {
        title: 'デジタルドローイング',
        subTitle: 'デジタルドローイング、Procreate',
      },
    },
  },
  {
    id: 17,
    image: [IMG('work-game-of-life.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-5',
    date: { year: 2022, month: 2 },
    content: {
      en: { title: 'Game of Life', subTitle: 'Creative Coding, P5js' },
      'zh-TW': { title: 'Game of Life', subTitle: '創意編程、P5js' },
      ja: {
        title: 'Game of Life',
        subTitle: 'クリエイティブコーディング、P5js',
      },
    },
  },
  {
    id: 16,
    image: [IMG('work-string-art-portrait.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-4',
    date: { year: 2022, month: 2 },
    content: {
      en: { title: 'String Art Portrait', subTitle: 'Creative Coding, P5js' },
      'zh-TW': { title: '弦線藝術肖像', subTitle: '創意編程、P5js' },
      ja: {
        title: 'ストリングアートポートレート',
        subTitle: 'クリエイティブコーディング、P5js',
      },
    },
  },
  {
    id: 15,
    image: [IMG('work-code-portrait.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-4',
    date: { year: 2022, month: 2 },
    content: {
      en: { title: 'Code Portrait', subTitle: 'Creative Coding, P5js' },
      'zh-TW': { title: '程式碼肖像', subTitle: '創意編程、P5js' },
      ja: {
        title: 'コードポートレート',
        subTitle: 'クリエイティブコーディング、P5js',
      },
    },
  },
  {
    id: 14,
    image: [IMG('work-composition-w-red-blue-yellow-and-drunk.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-3',
    date: { year: 2022, month: 2 },
    content: {
      en: {
        title: 'Composition with red, blue, yellow and drunk',
        subTitle: 'Creative Coding, P5js',
      },
      'zh-TW': { title: '紅、藍、黃與醉的構圖', subTitle: '創意編程、P5js' },
      ja: {
        title: '赤、青、黄、そして酔いの構図',
        subTitle: 'クリエイティブコーディング、P5js',
      },
    },
  },
  {
    id: 13,
    image: [IMG('work-tri-subdivision-portrait.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-3',
    date: { year: 2022, month: 2 },
    content: {
      en: {
        title: 'Tri-Subdivision Portrait',
        subTitle: 'Creative Coding, P5js',
      },
      'zh-TW': { title: '三角細分肖像', subTitle: '創意編程、P5js' },
      ja: {
        title: '三角分割ポートレート',
        subTitle: 'クリエイティブコーディング、P5js',
      },
    },
  },
  {
    id: 12,
    image: [IMG('work-fractal-tree.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/week-3',
    date: { year: 2022, month: 2 },
    content: {
      en: { title: 'Fractal Tree', subTitle: 'Creative Coding, P5js' },
      'zh-TW': { title: '碎形樹', subTitle: '創意編程、P5js' },
      ja: {
        title: 'フラクタルツリー',
        subTitle: 'クリエイティブコーディング、P5js',
      },
    },
  },
  {
    id: 11,
    image: [IMG('work-cell-generation.webp')],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-2',
    date: { year: 2022, month: 2 },
    content: {
      en: {
        title: 'Cell Generation Sketch',
        subTitle: 'Creative Coding, P5js',
      },
      'zh-TW': { title: '細胞生成草圖', subTitle: '創意編程、P5js' },
      ja: {
        title: 'セル生成スケッチ',
        subTitle: 'クリエイティブコーディング、P5js',
      },
    },
  },
  {
    id: 10,
    image: [IMG('work-drawing-january-15.webp')],
    category: [WorkCategory.DRAWING],
    url: '/blogs/5',
    date: { year: 2022, month: 1 },
    content: {
      en: {
        title: 'Charcoal Sketching',
        subTitle: 'Drawing, Sketching, Charcoal',
      },
      'zh-TW': { title: '炭筆素描', subTitle: '繪畫、素描、炭筆' },
      ja: { title: '木炭スケッチ', subTitle: 'ドローイング、スケッチ、木炭' },
    },
  },
  {
    id: 7,
    image: [IMG('work-health-care-assitant.webp')],
    category: [WorkCategory.ARDUINO],
    url: 'https://www.youtube.com/watch?v=ZdePYoBpiAg',
    date: { year: 2021, month: 12 },
    content: {
      en: { title: 'Health Assistant Device', subTitle: 'Robot, Arduino' },
      'zh-TW': { title: '健康助理裝置', subTitle: '機器人、Arduino' },
      ja: {
        title: 'ヘルスアシスタントデバイス',
        subTitle: 'ロボット、Arduino',
      },
    },
  },
  {
    id: 5,
    image: [IMG('work-velorace.webp')],
    category: [WorkCategory.MOBILE],
    featured: true,
    stacks: ['Android Studio', 'Java'],
    url: 'https://github.com/kwwong1022/VeloRace',
    date: { year: 2021, month: 0 },
    content: {
      en: { title: 'Velo Race', subTitle: 'Mobile, Android Studio' },
      'zh-TW': { title: 'Velo Race', subTitle: '行動應用、Android Studio' },
      ja: { title: 'Velo Race', subTitle: 'モバイル、Android Studio' },
    },
  },
  {
    id: 4,
    image: [IMG('work-postnote.webp')],
    category: [WorkCategory.MOBILE],
    featured: true,
    stacks: ['Android Studio', 'Java'],
    url: 'https://github.com/kwwong1022/PostNote',
    date: { year: 2021, month: 0 },
    content: {
      en: { title: 'Post Note', subTitle: 'Mobile, Android Studio' },
      'zh-TW': { title: 'Post Note', subTitle: '行動應用、Android Studio' },
      ja: { title: 'Post Note', subTitle: 'モバイル、Android Studio' },
    },
  },
  {
    id: 3,
    image: [IMG('work-zwift-plan.webp')],
    category: [WorkCategory.WEBSITE],
    url: 'https://github.com/kwwong1022/ZwiftPlan',
    date: { year: 2021, month: 1 },
    content: {
      en: { title: 'Zwift Plan', subTitle: 'Website, Application' },
      'zh-TW': { title: 'Zwift Plan', subTitle: '網站、應用程式' },
      ja: { title: 'Zwift Plan', subTitle: 'ウェブサイト、アプリケーション' },
    },
  },
  {
    id: 2,
    image: [IMG('work-ggj.webp')],
    category: [WorkCategory.GRAPHIC],
    featured: true,
    stacks: ['Unity', 'C#'],
    url: 'https://globalgamejam.org/2021/games/discover-undiscovered-6',
    date: { year: 2021, month: 1 },
    content: {
      en: {
        title: 'Discover the Undiscovered',
        subTitle: 'Game, Unity, Global Game Jam',
      },
      'zh-TW': {
        title: 'Discover the Undiscovered',
        subTitle: '遊戲、Unity、Global Game Jam',
      },
      ja: {
        title: 'Discover the Undiscovered',
        subTitle: 'ゲーム、Unity、Global Game Jam',
      },
    },
  },
  {
    id: 1,
    image: [IMG('work-voronoi-plate.webp')],
    category: [WorkCategory.MODELLING],
    url: '#',
    date: { year: 2021, month: 0 },
    content: {
      en: {
        title: 'Voronoi Plate Model',
        subTitle: 'Material, 3D Modelling, Rhino 7',
      },
      'zh-TW': {
        title: 'Voronoi 板材模型',
        subTitle: '材料、3D 建模、Rhino 7',
      },
      ja: {
        title: 'ボロノイプレートモデル',
        subTitle: '素材、3Dモデリング、Rhino 7',
      },
    },
  },
  {
    id: 0,
    image: [IMG('work-dark-forrest.webp')],
    category: [WorkCategory.GRAPHIC],
    url: 'https://www.youtube.com/watch?v=DIT1evqXm_o',
    date: { year: 0, month: 0 },
    content: {
      en: {
        title: 'Dark Forest Card Game',
        subTitle: 'Game, Concept Art, Drawing',
      },
      'zh-TW': { title: '暗黑森林卡牌遊戲', subTitle: '遊戲、概念藝術、繪畫' },
      ja: {
        title: 'ダークフォレストカードゲーム',
        subTitle: 'ゲーム、コンセプトアート、ドローイング',
      },
    },
  },
]

const resolve = (lang: string): Work[] =>
  items.map(item => {
    const c = item.content[lang] ?? item.content.en
    return {
      id: item.id,
      image: item.image,
      category: item.category,
      stacks: item.stacks,
      featured: item.featured,
      url: item.url,
      date: item.date,
      title: c.title,
      subTitle: c.subTitle,
    }
  })

export const getWorks = (lang: string): Work[] => resolve(lang)

export const works = resolve('en')
