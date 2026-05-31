import { render } from '@testing-library/react'
import CodeEditor from '../index'

vi.mock('@monaco-editor/react', () => ({
  default: ({
    defaultValue,
    defaultLanguage,
  }: {
    defaultValue: string
    defaultLanguage: string
  }) => (
    <div data-testid="mock-editor" data-language={defaultLanguage}>
      {defaultValue}
    </div>
  ),
}))

vi.mock('@/utils/theme', () => ({
  isDarkTheme: () => false,
}))

describe('CodeEditor', () => {
  it('renders the editor with provided value', () => {
    const { getByTestId } = render(
      <CodeEditor readOnly language="javascript" value="const x = 1" />
    )
    const editor = getByTestId('mock-editor')
    expect(editor).toHaveTextContent('const x = 1')
  })

  it('passes language to editor', () => {
    const { getByTestId } = render(
      <CodeEditor readOnly language="typescript" value="" />
    )
    expect(getByTestId('mock-editor')).toHaveAttribute(
      'data-language',
      'typescript'
    )
  })

  it('renders without crashing with default props', () => {
    const { getByTestId } = render(
      <CodeEditor readOnly language="markdown" value="" />
    )
    expect(getByTestId('mock-editor')).toBeInTheDocument()
  })
})
