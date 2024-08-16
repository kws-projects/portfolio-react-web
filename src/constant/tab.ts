export enum HomeBannerTab {
  ABOUT = 'ABOUT',
  SKILLS = 'SKILLS',
  FEATURED_WORKS = 'FEATURED_WORKS',
  EXPERIENCE = 'EXPERIENCE',
}

export const getHomeBannerTabLabel = (): {
  [key: string]: string
} => ({
  [HomeBannerTab.ABOUT]: 'About',
  [HomeBannerTab.SKILLS]: 'Skills',
  [HomeBannerTab.FEATURED_WORKS]: 'Featured Works',
  [HomeBannerTab.EXPERIENCE]: 'Experience',
})
