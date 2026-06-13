import './blog-content.css'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Color from '@tiptap/extension-color'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { common, createLowlight } from 'lowlight'

import { MermaidCodeBlockView } from './MermaidCodeBlock'

const lowlight = createLowlight(common)

const CodeBlockWithMermaid = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(MermaidCodeBlockView)
  },
})

const HeadingWithId = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level as number
    const text = node.textContent
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    return [`h${level}`, { ...HTMLAttributes, id }, 0]
  },
})

interface TiptapRendererProps {
  content: Record<string, unknown>
}

export function TiptapRenderer({ content }: TiptapRendererProps) {
  const editor = useEditor({
    editable: false,
    content,
    extensions: [
      StarterKit.configure({ codeBlock: false, heading: false }),
      HeadingWithId.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Image,
      Link.configure({ openOnClick: true }),
      CodeBlockWithMermaid.configure({ lowlight }),
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
  })

  if (!editor) return null

  return (
    <div className="tiptap-content prose prose-lg dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  )
}
