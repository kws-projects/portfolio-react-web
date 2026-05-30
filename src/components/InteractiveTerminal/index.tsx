import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type Line = {
  text: string
  type: 'input' | 'output' | 'error' | 'system'
}

const PAGES = ['about', 'works', 'blogs', 'contact'] as const

const WELCOME: Line[] = [
  { text: "Welcome to Kenneth Wong's portfolio.", type: 'system' },
  { text: "Type 'help' to see available commands.", type: 'system' },
  { text: '', type: 'output' },
]

const HELP_OUTPUT: Line[] = [
  { text: 'Available commands:', type: 'output' },
  { text: '', type: 'output' },
  { text: '  help              Show this message', type: 'output' },
  { text: '  whoami            About the developer', type: 'output' },
  { text: '  skills            Display tech stack', type: 'output' },
  { text: '  ls                List pages', type: 'output' },
  { text: '  cd <page>         Navigate to a page', type: 'output' },
  { text: '  echo <text>       Echo back text', type: 'output' },
  { text: '  date              Current date & time', type: 'output' },
  { text: '  clear             Clear terminal', type: 'output' },
  { text: '  exit              Close terminal', type: 'output' },
  { text: '', type: 'output' },
  { text: '  Pages: about, works, blogs, contact', type: 'system' },
]

const getLineColor = (type: Line['type']) => {
  switch (type) {
    case 'input':
      return '#e0e0e0'
    case 'output':
      return '#b0b0b5'
    case 'error':
      return '#f87171'
    case 'system':
      return '#7a7a80'
  }
}

const getOutput = (
  lower: string,
  raw: string
): { lines: Line[]; navTo?: string } => {
  if (lower === 'help') return { lines: HELP_OUTPUT }

  if (lower === 'whoami') {
    return {
      lines: [
        { text: 'Kenneth Wong', type: 'output' },
        { text: 'Fullstack Software Engineer', type: 'output' },
        { text: 'Hong Kong', type: 'output' },
      ],
    }
  }

  if (lower === 'skills') {
    return {
      lines: [
        {
          text: 'Frontend  React · TypeScript · Next.js · Tailwind CSS',
          type: 'output',
        },
        {
          text: 'Backend   Node.js · Kotlin · Go · PostgreSQL',
          type: 'output',
        },
        {
          text: 'Cloud     AWS · Docker · Kubernetes · Terraform',
          type: 'output',
        },
      ],
    }
  }

  if (lower === 'ls') {
    return {
      lines: [
        { text: 'about/    works/    blogs/    contact/', type: 'output' },
      ],
    }
  }

  if (lower === 'date') {
    return { lines: [{ text: new Date().toLocaleString(), type: 'output' }] }
  }

  if (lower.startsWith('echo ')) {
    return { lines: [{ text: raw.slice(5), type: 'output' }] }
  }

  if (lower.startsWith('cd ')) {
    const page = lower.slice(3).trim().replace(/\//g, '')
    if ((PAGES as readonly string[]).includes(page)) {
      return {
        lines: [{ text: `→ Navigating to /${page}...`, type: 'system' }],
        navTo: `/${page}`,
      }
    }
    return {
      lines: [
        { text: `cd: no such directory: ${page}`, type: 'error' },
        { text: `Try: ${PAGES.join(', ')}`, type: 'system' },
      ],
    }
  }

  if ((PAGES as readonly string[]).includes(lower)) {
    return {
      lines: [{ text: `→ Navigating to /${lower}...`, type: 'system' }],
      navTo: `/${lower}`,
    }
  }

  if (lower === 'hi' || lower === 'hello') {
    return {
      lines: [{ text: 'Hey there! Thanks for visiting.', type: 'output' }],
    }
  }

  if (lower === 'sudo' || lower.startsWith('sudo ')) {
    return { lines: [{ text: 'Nice try.', type: 'error' }] }
  }

  return {
    lines: [
      { text: `command not found: ${raw}`, type: 'error' },
      { text: "Type 'help' for available commands.", type: 'system' },
    ],
  }
}

type InteractiveTerminalProps = {
  onClose?: () => void
}

const InteractiveTerminal = ({ onClose }: InteractiveTerminalProps) => {
  const navigate = useNavigate()
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      const lower = trimmed.toLowerCase()

      if (lower === 'clear') {
        setLines([])
        return
      }

      if (lower === 'exit') {
        onClose?.()
        return
      }

      const inputLine: Line = { text: `$ ${trimmed}`, type: 'input' }

      if (!trimmed) {
        setLines(prev => [...prev, inputLine])
        return
      }

      setHistory(prev => [...prev, trimmed])
      setHistoryIdx(-1)

      const { lines: output, navTo } = getOutput(lower, trimmed)
      setLines(prev => [...prev, inputLine, ...output])

      if (navTo) {
        setTimeout(() => {
          onClose?.()
          navigate(navTo)
        }, 600)
      }
    },
    [navigate, onClose]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'Escape') {
      onClose?.()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const idx =
          historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx !== -1) {
        const idx = historyIdx + 1
        if (idx >= history.length) {
          setHistoryIdx(-1)
          setInput('')
        } else {
          setHistoryIdx(idx)
          setInput(history[idx])
        }
      }
    }
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden cursor-text shadow-2xl"
      onClick={() => inputRef.current?.focus()}
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* macOS title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 cursor-default"
        style={{ backgroundColor: '#2a2a2e' }}
      >
        <button
          onClick={e => {
            e.stopPropagation()
            onClose?.()
          }}
          className="w-3 h-3 rounded-full hover:brightness-110 transition-all"
          style={{ backgroundColor: '#ff5f57' }}
          aria-label="Close terminal"
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: '#febc2e' }}
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: '#28c840' }}
        />
        <span
          className="mx-auto text-xs select-none"
          style={{ color: '#7a7a80', fontFamily: 'monospace' }}
        >
          terminal — ~/portfolio
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="p-5 h-80 overflow-y-auto no-scrollbar"
        style={{ backgroundColor: '#1a1a1e', fontFamily: 'monospace' }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="text-sm leading-6 whitespace-pre-wrap break-words"
            style={{ color: getLineColor(line.type) }}
          >
            {line.text || '\u00A0'}
          </div>
        ))}

        <div className="flex items-center text-sm">
          <span className="mr-2 select-none" style={{ color: '#e0e0e0' }}>
            $
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-sm p-0"
            style={{
              color: '#e0e0e0',
              caretColor: '#e0e0e0',
              fontFamily: 'monospace',
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}

export default InteractiveTerminal
