import type { LegalDocument } from '@/services/api/mappers'
import { render, screen } from '@testing-library/react'

import LegalContent from '../index'

vi.mock('@/hooks/useFadeInView', () => ({
  default: () => ({
    ref: { current: null },
    motionProps: {},
  }),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

vi.mock('@/components/blog/TiptapRenderer', () => ({
  TiptapRenderer: ({ content }: { content: Record<string, unknown> }) => (
    <div data-testid="tiptap-renderer">{JSON.stringify(content)}</div>
  ),
}))

const mockDocument: LegalDocument = {
  title: 'Terms and Conditions',
  lastUpdated: '2024-01-01',
  sections: [
    {
      heading: 'Section 1',
      blocks: [
        { type: 'text', content: 'Some legal text.' },
        { type: 'list', items: ['Item A', 'Item B'] },
        { type: 'link', text: 'Visit site', href: 'https://example.com' },
      ],
    },
    {
      heading: 'Section 2',
      blocks: [{ type: 'text', content: 'More text.' }],
    },
  ],
}

describe('LegalContent', () => {
  it('renders the document title', () => {
    render(<LegalContent document={mockDocument} />)
    expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
  })

  it('renders the last updated date', () => {
    render(<LegalContent document={mockDocument} />)
    expect(screen.getByText(/2024-01-01/)).toBeInTheDocument()
  })

  it('renders section headings', () => {
    render(<LegalContent document={mockDocument} />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
  })

  it('renders text blocks', () => {
    render(<LegalContent document={mockDocument} />)
    expect(screen.getByText('Some legal text.')).toBeInTheDocument()
    expect(screen.getByText('More text.')).toBeInTheDocument()
  })

  it('renders list items', () => {
    render(<LegalContent document={mockDocument} />)
    expect(screen.getByText('Item A')).toBeInTheDocument()
    expect(screen.getByText('Item B')).toBeInTheDocument()
  })

  it('renders link blocks', () => {
    render(<LegalContent document={mockDocument} />)
    const link = screen.getByText('Visit site')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders TipTap content when tiptapContent is provided', () => {
    const tiptapDoc: LegalDocument = {
      title: 'Privacy Policy',
      lastUpdated: '2024-06-01',
      sections: [],
      tiptapContent: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
        ],
      },
    }

    render(<LegalContent document={tiptapDoc} />)

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByTestId('tiptap-renderer')).toBeInTheDocument()
    expect(screen.queryByText('Section 1')).not.toBeInTheDocument()
  })

  it('renders structured sections when tiptapContent is not provided', () => {
    render(<LegalContent document={mockDocument} />)

    expect(screen.queryByTestId('tiptap-renderer')).not.toBeInTheDocument()
    expect(screen.getByText('Section 1')).toBeInTheDocument()
  })
})
