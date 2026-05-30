import Editor, { Monaco } from '@monaco-editor/react'
import { isDarkTheme } from '@/utils/theme'

const CodeEditor = ({
  readOnly = true,
  language = 'markdown',
  value = '',
  height,
}: {
  readOnly: boolean
  language: string
  value: string
  height?: number | string
}) => {
  const dark = isDarkTheme()

  const handleEditorDidMount = (monaco: Monaco) => {
    const root = getComputedStyle(document.documentElement)
    const rgb = root.getPropertyValue('--color-surface-code').trim()
    const hex = `#${rgb
      .split(' ')
      .map(v => Number(v).toString(16).padStart(2, '0'))
      .join('')}`

    monaco.editor.defineTheme('custom-theme', {
      base: dark ? 'vs-dark' : 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': hex,
      },
    })
  }

  return (
    <Editor
      height={height || '100%'}
      defaultLanguage={language}
      defaultValue={value}
      theme="custom-theme"
      options={{
        readOnly,
        wordWrap: 'on',
        minimap: {
          enabled: false,
        },
      }}
      beforeMount={handleEditorDidMount}
    />
  )
}

export default CodeEditor
