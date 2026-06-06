import { WorkCategory } from '@/constant/work'
import type { Work } from '@/constant/work'
import type { CmsEntity } from '@/services/api/types'
import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import useWorkFilter from '../useWorkFilter'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}))

const mockWorkEntities: CmsEntity[] = [
  {
    id: '1',
    slug: '1',
    status: 'published',
    sortOrder: 1,
    properties: {},
    publishedAt: null,
    createdAt: '',
    updatedAt: '',
  },
]

const mockMappedWorks: Work[] = [
  {
    id: 1,
    title: 'Site A',
    subTitle: 'Sub A',
    image: ['/a.png'],
    category: [WorkCategory.WEBSITE],
    url: '',
    date: { year: 2024, month: 1 },
  },
  {
    id: 2,
    title: 'App B',
    subTitle: 'Sub B',
    image: ['/b.png'],
    category: [WorkCategory.MOBILE],
    url: '',
    date: { year: 2024, month: 2 },
  },
  {
    id: 3,
    title: 'Site C',
    subTitle: 'Sub C',
    image: ['/c.png'],
    category: [WorkCategory.WEBSITE],
    url: '',
    date: { year: 2024, month: 3 },
  },
]

vi.mock('@/hooks/usePortfolioData', () => ({
  useWorks: vi.fn(() => ({
    data: mockWorkEntities,
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  })),
}))

vi.mock('@/services/api/mappers', () => ({
  mapWorks: vi.fn(() => mockMappedWorks),
}))

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('useWorkFilter', () => {
  describe('availableCategories', () => {
    it('starts with WorkCategory.ALL', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })
      expect(result.current.workCategories[0]).toBe(WorkCategory.ALL)
    })

    it('only includes categories present in work data', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })
      expect(result.current.workCategories).toContain(WorkCategory.WEBSITE)
      expect(result.current.workCategories).toContain(WorkCategory.MOBILE)
      expect(result.current.workCategories).not.toContain(WorkCategory.GRAPHIC)
      expect(result.current.workCategories).not.toContain(WorkCategory.ARDUINO)
    })

    it('follows enum ordering after ALL', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })
      const cats = result.current.workCategories
      const mobileIdx = cats.indexOf(WorkCategory.MOBILE)
      const websiteIdx = cats.indexOf(WorkCategory.WEBSITE)
      expect(mobileIdx).toBeLessThan(websiteIdx)
    })
  })

  describe('availableCategories with empty data', () => {
    it('returns only [ALL] when works data is empty', async () => {
      const { mapWorks } = await import('@/services/api/mappers')
      vi.mocked(mapWorks).mockReturnValueOnce([])

      const { result } = renderHook(() => useWorkFilter(), { wrapper })
      expect(result.current.workCategories).toEqual([WorkCategory.ALL])
    })
  })

  describe('filteredWorks', () => {
    it('returns all works when ALL is selected', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })
      expect(result.current.selectedCategories).toEqual([WorkCategory.ALL])
      expect(result.current.filteredWorks).toHaveLength(3)
    })

    it('filters by selected category', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })

      act(() => result.current.handleCategoryChange(WorkCategory.WEBSITE))

      expect(result.current.filteredWorks).toHaveLength(2)
      expect(
        result.current.filteredWorks.every(
          w => w.category[0] === WorkCategory.WEBSITE
        )
      ).toBe(true)
    })
  })

  describe('handleCategoryChange', () => {
    it('removes ALL when selecting a specific category', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })

      act(() => result.current.handleCategoryChange(WorkCategory.MOBILE))

      expect(result.current.selectedCategories).not.toContain(WorkCategory.ALL)
      expect(result.current.selectedCategories).toContain(WorkCategory.MOBILE)
    })

    it('toggles a category off when already selected (if more than one)', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })

      act(() => result.current.handleCategoryChange(WorkCategory.WEBSITE))
      act(() => result.current.handleCategoryChange(WorkCategory.MOBILE))

      expect(result.current.selectedCategories).toEqual([
        WorkCategory.WEBSITE,
        WorkCategory.MOBILE,
      ])

      act(() => result.current.handleCategoryChange(WorkCategory.WEBSITE))

      expect(result.current.selectedCategories).toEqual([WorkCategory.MOBILE])
    })

    it('does not deselect the last remaining category', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })

      act(() => result.current.handleCategoryChange(WorkCategory.WEBSITE))
      act(() => result.current.handleCategoryChange(WorkCategory.WEBSITE))

      expect(result.current.selectedCategories).toEqual([WorkCategory.WEBSITE])
    })

    it('resets to ALL when ALL is selected', () => {
      const { result } = renderHook(() => useWorkFilter(), { wrapper })

      act(() => result.current.handleCategoryChange(WorkCategory.WEBSITE))
      act(() => result.current.handleCategoryChange(WorkCategory.MOBILE))
      expect(result.current.selectedCategories).toEqual([
        WorkCategory.WEBSITE,
        WorkCategory.MOBILE,
      ])

      act(() => result.current.handleCategoryChange(WorkCategory.ALL))
      expect(result.current.selectedCategories).toEqual([WorkCategory.ALL])
    })
  })

  describe('disableFilter', () => {
    it('returns ALL and does not update URL when disabled', () => {
      const { result } = renderHook(
        () => useWorkFilter({ disableFilter: true }),
        { wrapper }
      )
      expect(result.current.selectedCategories).toEqual([WorkCategory.ALL])
    })
  })
})
