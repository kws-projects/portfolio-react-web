export enum WorkCategory {
  ALL = 'All',
  MOBILE = 'Mobile App',
  WEBSITE = 'Website',
  GRAPHIC = 'Graphic',
  CREATIVE_CODING = 'Creative Coding',
  MODELLING = '3D Modelling',
  DRAWING = 'Drawing',
  ARDUINO = 'Arduino',
  TOOL = 'Tool',
}

interface IWork {
  id: number
  title: string
  subTitle: string
  description?: string
  image: string[]
  category: WorkCategory[]
  stacks?: string[]
  featured?: boolean
  url: string
  date: {
    year: number
    month: number
  }
}

export const works: IWork[] = [
  {
    id: 23,
    title: 'Kws WebTools',
    subTitle: 'Online web tools, AI, Cloud',
    image: ['https://static.kwwdev.com/images/works/work-kws-web-tools.webp'],
    category: [WorkCategory.WEBSITE],
    url: 'https://github.com/kwwong1022/kws-web-tools',
    date: { year: 2023, month: 1 },
  },
  {
    id: 22,
    title: 'GPX Visuzlization',
    subTitle: 'GPX file to Zwift Info Card Video',
    image: [
      'https://static.kwwdev.com/images/works/work-gpx-visualization.webp',
    ],
    category: [WorkCategory.TOOL],
    url: '#',
    date: { year: 2022, month: 6 },
  },
  {
    id: 21,
    title: 'Web Portrait',
    subTitle: 'Extension, Data Portrait',
    image: ['https://static.kwwdev.com/images/works/work-web-portrait.webp'],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/final-project',
    date: { year: 2022, month: 5 },
  },
  {
    id: 20,
    title: 'Shooting Game w/ ML Facial Recognition',
    subTitle: 'Arduino, Game, Machine Learning',
    image: [
      'https://static.kwwdev.com/images/works/work-shooting-game-w-ml.webp',
    ],
    category: [WorkCategory.ARDUINO],
    url: 'https://projecthub.arduino.cc/kwwong1022/immersive-shooting-game-w-ml-facial-recognition-d368fb',
    date: { year: 2022, month: 4 },
  },
  {
    id: 19,
    title: 'Digital Drawing',
    subTitle: 'Digital Drawing, Procreate',
    image: [
      'https://static.kwwdev.com/images/works/work-drawing-march-3-2021.webp',
    ],
    category: [WorkCategory.DRAWING],
    url: '/blogs/13',
    date: { year: 2022, month: 2 },
  },
  {
    id: 17,
    title: 'Game of Life',
    subTitle: 'Creative Coding, P5js',
    image: ['https://static.kwwdev.com/images/works/work-game-of-life.webp'],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-5',
    date: { year: 2022, month: 2 },
  },
  {
    id: 16,
    title: 'String Art Portrait',
    subTitle: 'Creative Coding, P5js',
    image: [
      'https://static.kwwdev.com/images/works/work-string-art-portrait.webp',
    ],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-4',
    date: { year: 2022, month: 2 },
  },
  {
    id: 15,
    title: 'Code Portrait',
    subTitle: 'Creative Coding, P5js',
    image: ['https://static.kwwdev.com/images/works/work-code-portrait.webp'],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-4',
    date: { year: 2022, month: 2 },
  },
  {
    id: 14,
    title: 'Composition with red, blue, yellow and drunk',
    subTitle: 'Creative Coding, P5js',
    image: [
      'https://static.kwwdev.com/images/works/work-composition-w-red-blue-yellow-and-drunk.webp',
    ],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-3',
    date: { year: 2022, month: 2 },
  },
  {
    id: 13,
    title: 'Tri-Subdivision Portrait',
    subTitle: 'Creative Coding, P5js',
    image: [
      'https://static.kwwdev.com/images/works/work-tri-subdivision-portrait.webp',
    ],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-3',
    date: { year: 2022, month: 2 },
  },
  {
    id: 12,
    title: 'Fractal Tree',
    subTitle: 'Creative Coding, P5js',
    image: ['https://static.kwwdev.com/images/works/work-fractal-tree.webp'],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/week-3',
    date: { year: 2022, month: 2 },
  },
  {
    id: 11,
    title: 'Cell Generation Sketch',
    subTitle: 'Creative Coding, P5js',
    image: ['https://static.kwwdev.com/images/works/work-cell-generation.webp'],
    category: [WorkCategory.CREATIVE_CODING],
    url: 'https://observablehq.com/@kwwong1022/assignment-2',
    date: { year: 2022, month: 2 },
  },
  {
    id: 10,
    title: 'Charcoal Sketching',
    subTitle: 'Drawing, Sketching, Charcoal',
    image: [
      'https://static.kwwdev.com/images/works/work-drawing-january-15.webp',
    ],
    category: [WorkCategory.DRAWING],
    url: '/blogs/5',
    date: { year: 2022, month: 1 },
  },
  {
    id: 7,
    title: 'Health Assitant Device',
    subTitle: 'Robot, Arduino',
    image: [
      'https://static.kwwdev.com/images/works/work-health-care-assitant.webp',
    ],
    category: [WorkCategory.ARDUINO],
    url: 'https://www.youtube.com/watch?v=ZdePYoBpiAg',
    date: { year: 2021, month: 12 },
  },
  {
    id: 5,
    title: 'Velo Race',
    subTitle: 'Mobile, Android Studio',
    image: ['https://static.kwwdev.com/images/works/work-velorace.webp'],
    category: [WorkCategory.MOBILE],
    featured: true,
    stacks: ['Android Studio', 'Java'],
    url: 'https://github.com/kwwong1022/VeloRace',
    date: { year: 2021, month: 0 },
  },
  {
    id: 4,
    title: 'Post Note',
    subTitle: 'Mobile, Android Studio',
    image: ['https://static.kwwdev.com/images/works/work-postnote.webp'],
    category: [WorkCategory.MOBILE],
    featured: true,
    stacks: ['Android Studio', 'Java'],
    url: 'https://github.com/kwwong1022/PostNote',
    date: { year: 2021, month: 0 },
  },
  {
    id: 3,
    title: 'Zwift Plan',
    subTitle: 'Website, Application',
    image: ['https://static.kwwdev.com/images/works/work-zwift-plan.webp'],
    category: [WorkCategory.WEBSITE],
    url: 'https://github.com/kwwong1022/ZwiftPlan',
    date: { year: 2021, month: 1 },
  },
  {
    id: 2,
    title: 'Discover the Undiscovered',
    subTitle: 'Game, Unity, Global Game Jam',
    image: ['https://static.kwwdev.com/images/works/work-ggj.webp'],
    category: [WorkCategory.GRAPHIC],
    featured: true,
    stacks: ['Unity', 'C#'],
    url: 'https://globalgamejam.org/2021/games/discover-undiscovered-6',
    date: { year: 2021, month: 1 },
  },
  {
    id: 1,
    title: 'Voronoi Plate Model',
    subTitle: 'Material, 3D Modelling, Rhino 7',
    image: ['https://static.kwwdev.com/images/works/work-voronoi-plate.webp'],
    category: [WorkCategory.MODELLING],
    url: '#',
    date: { year: 2021, month: 0 },
  },
  {
    id: 0,
    title: 'Dark Forrest Card Game',
    subTitle: 'Game, Concept Art, Drawing',
    image: ['https://static.kwwdev.com/images/works/work-dark-forrest.webp'],
    category: [WorkCategory.GRAPHIC],
    url: 'https://www.youtube.com/watch?v=DIT1evqXm_o',
    date: { year: 0, month: 0 },
  },
]
