import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const CELL = 12
const SCROLL_SPEED = 0.8

const NotFoundSketch = () => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      let offset = 0
      let cols: number
      let rows: number
      let paused = false

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
        s.textFont('monospace')
        s.noStroke()
        cols = Math.ceil(s.width / CELL)
        rows = Math.ceil(s.height / CELL)
      }

      s.draw = () => {
        const bg = getThemeColor('--color-bg')
        const dark = isDarkTheme()
        s.background(bg[0], bg[1], bg[2])

        const textChars = '404NOTFOUND'
        const dimAlpha = dark ? 18 : 22

        s.textSize(CELL - 1)
        s.textAlign(s.CENTER, s.CENTER)

        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            const cx = col * CELL + CELL / 2
            const cy = row * CELL + CELL / 2

            const noiseVal = s.noise(col * 0.08, row * 0.08 + offset * 0.01)
            const charIdx =
              Math.floor(noiseVal * textChars.length) % textChars.length
            const ch = textChars[charIdx]

            const mx = s.mouseX
            const my = s.mouseY
            const d = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2)
            const mouseRadius = 120

            if (d < mouseRadius) {
              const alpha = s.map(d, 0, mouseRadius, dark ? 220 : 200, dimAlpha)
              const size = s.map(d, 0, mouseRadius, CELL + 3, CELL - 1)
              s.fill(dark ? 240 : 20, dark ? 240 : 20, dark ? 240 : 20, alpha)
              s.textSize(size)
              s.text(ch, cx, cy)
              s.textSize(CELL - 1)
            } else {
              s.fill(
                dark ? 240 : 20,
                dark ? 240 : 20,
                dark ? 240 : 20,
                dimAlpha
              )
              s.text(ch, cx, cy)
            }
          }
        }

        if (!paused) {
          offset += SCROLL_SPEED
        }
      }

      s.mousePressed = () => {
        paused = !paused
      }

      s.windowResized = () => {
        const parent = renderRef.current
        if (parent) {
          s.resizeCanvas(parent.offsetWidth, parent.offsetHeight)
          cols = Math.ceil(s.width / CELL)
          rows = Math.ceil(s.height / CELL)
        }
      }
    })

    return () => {
      sRef?.remove()
    }
  }, [])

  return <div className="w-full h-full -z-10" ref={renderRef} />
}

export default NotFoundSketch
