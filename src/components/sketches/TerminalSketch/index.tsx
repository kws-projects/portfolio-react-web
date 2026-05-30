import { useEffect, useRef } from 'react'
import p5 from 'p5'

const COMMANDS = [
  {
    cmd: 'whoami',
    output: ['Kenneth Wong', 'Fullstack Software Engineer'],
  },
  { cmd: 'cat location.txt', output: ['Hong Kong'] },
  { cmd: 'cat email.txt', output: ['kaifwong1022@gmail.com'] },
  { cmd: 'cat phone.txt', output: ['(+852) 9347 8968'] },
  {
    cmd: 'echo "Let\'s build something together"',
    output: ["Let's build something together"],
  },
]

const BAR_HEIGHT = 36

const TerminalSketch = () => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      const LINE_HEIGHT = 22
      const PADDING = 24
      const CHAR_DELAY = 1
      const LINE_PAUSE = 12

      let lines: { text: string; color: string; done: boolean }[] = []
      let currentLine = 0
      let charIndex = 0
      let pauseCounter = 0
      let allDone = false
      let cursorVisible = true
      let cursorTimer = 0
      let commandIndex = 0
      let phase: 'cmd' | 'pause' | 'output' = 'cmd'

      const promptColor = () => '#e0e0e0'
      const textColor = () => '#a0a0a5'
      const dimColor = () => '#555560'

      const buildLines = () => {
        lines = []
        const c = COMMANDS[commandIndex]
        lines.push({ text: `$ ${c.cmd}`, color: 'prompt', done: false })
        for (const line of c.output) {
          lines.push({ text: line, color: 'text', done: false })
        }
        lines.push({ text: '', color: 'prompt', done: false })
      }

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
        s.frameRate(30)
        s.textFont('monospace')
        s.textSize(13)
        buildLines()
      }

      s.draw = () => {
        s.background(14, 14, 18)

        // macOS title bar
        s.noStroke()
        s.fill(30, 30, 35)
        s.rect(0, 0, s.width, BAR_HEIGHT)

        // Separator line
        s.fill(45, 45, 50)
        s.rect(0, BAR_HEIGHT - 1, s.width, 1)

        // Traffic light buttons
        s.fill(255, 95, 87)
        s.ellipse(20, BAR_HEIGHT / 2, 11, 11)
        s.fill(254, 188, 46)
        s.ellipse(38, BAR_HEIGHT / 2, 11, 11)
        s.fill(40, 200, 64)
        s.ellipse(56, BAR_HEIGHT / 2, 11, 11)

        // Title text
        s.fill(dimColor())
        s.textSize(11)
        s.textAlign(s.CENTER, s.CENTER)
        s.text('terminal — ~/portfolio/contact', s.width / 2, BAR_HEIGHT / 2)
        s.textAlign(s.LEFT, s.BASELINE)
        s.textSize(13)

        // Terminal content starts below the bar
        let yOffset = BAR_HEIGHT + PADDING
        const historyStart = Math.max(0, commandIndex - 3)
        for (let h = historyStart; h < commandIndex; h++) {
          const cmd = COMMANDS[h]
          s.fill(dimColor())
          s.noStroke()
          s.text(`$ ${cmd.cmd}`, PADDING, yOffset)
          yOffset += LINE_HEIGHT
          for (const line of cmd.output) {
            s.text(line, PADDING, yOffset)
            yOffset += LINE_HEIGHT
          }
          yOffset += 6
        }

        for (let i = 0; i <= currentLine && i < lines.length; i++) {
          const line = lines[i]
          const isCurrentlyTyping = i === currentLine && !line.done

          let displayText: string
          if (line.done) {
            displayText = line.text
          } else if (isCurrentlyTyping) {
            displayText = line.text.substring(0, charIndex)
          } else {
            displayText = ''
          }

          const c = line.color === 'prompt' ? promptColor() : textColor()
          s.fill(c)
          s.noStroke()
          s.text(displayText, PADDING, yOffset + i * LINE_HEIGHT)

          if (isCurrentlyTyping || (allDone && i === lines.length - 1)) {
            cursorTimer++
            if (cursorTimer % 30 === 0) cursorVisible = !cursorVisible
            if (cursorVisible) {
              const cursorX = PADDING + s.textWidth(displayText)
              s.fill(promptColor())
              s.rect(cursorX + 1, yOffset + i * LINE_HEIGHT - 12, 8, 15)
            }
          }
        }

        if (!allDone) {
          if (phase === 'cmd' || phase === 'output') {
            if (s.frameCount % CHAR_DELAY === 0) {
              charIndex++
              if (charIndex >= lines[currentLine].text.length) {
                lines[currentLine].done = true
                phase = 'pause'
                pauseCounter = 0
              }
            }
          } else if (phase === 'pause') {
            pauseCounter++
            if (pauseCounter >= LINE_PAUSE) {
              currentLine++
              charIndex = 0
              if (currentLine >= lines.length) {
                commandIndex++
                if (commandIndex >= COMMANDS.length) {
                  allDone = true
                  commandIndex = COMMANDS.length
                } else {
                  currentLine = 0
                  buildLines()
                  phase = 'cmd'
                }
              } else {
                phase = lines[currentLine].color === 'prompt' ? 'cmd' : 'output'
              }
            }
          }
        }
      }

      s.windowResized = () => {
        const parent = renderRef.current
        if (parent) {
          s.resizeCanvas(parent.offsetWidth, parent.offsetHeight)
        }
      }
    })

    return () => {
      sRef?.remove()
    }
  }, [])

  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden"
      ref={renderRef}
    />
  )
}

export default TerminalSketch
