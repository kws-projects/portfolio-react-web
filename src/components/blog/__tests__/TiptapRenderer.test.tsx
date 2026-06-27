import { render, screen } from '@testing-library/react'

import { TiptapRenderer } from '../TiptapRenderer'

const mockUseEditor = vi.fn()

vi.mock('@tiptap/react', () => ({
  useEditor: (...args: unknown[]) => mockUseEditor(...args),
  EditorContent: () => <div data-testid="editor-content" />,
  ReactNodeViewRenderer: vi.fn(),
}))

vi.mock('lowlight', () => ({
  common: {},
  createLowlight: vi.fn(() => ({})),
}))

describe('TiptapRenderer', () => {
  it('returns null when editor is not ready', () => {
    mockUseEditor.mockReturnValue(null)

    const { container } = render(
      <TiptapRenderer content={{ type: 'doc', content: [] }} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders editor content when editor is ready', () => {
    mockUseEditor.mockReturnValue({})

    render(
      <TiptapRenderer
        content={{
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Hello' }],
            },
          ],
        }}
      />
    )

    expect(screen.getByTestId('editor-content')).toBeInTheDocument()
    expect(mockUseEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        editable: false,
        content: expect.objectContaining({ type: 'doc' }),
      })
    )
  })
})
