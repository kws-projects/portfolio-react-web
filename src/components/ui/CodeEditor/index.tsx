import Editor, { Monaco } from '@monaco-editor/react'

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
  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('my-theme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ededed',
      },
    })
  }

  return (
    <Editor
      height={height || '100%'}
      defaultLanguage={language}
      defaultValue={value}
      theme="my-theme"
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
