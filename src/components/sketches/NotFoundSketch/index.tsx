import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const CELL = 14
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
      const textChars = '404NOTFOUND'

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
        s.frameRate(30)
        s.textFont('monospace')
        s.noStroke()
        cols = Math.ceil(s.width / CELL)
        rows = Math.ceil(s.height / CELL)
      }

      s.draw = () => {
        const bg = getThemeColor('--color-bg')
        const dark = isDarkTheme()
        s.background(bg[0], bg[1], bg[2])

        const dimAlpha = dark ? 18 : 22
        const c = dark ? 240 : 20
        const mx = s.mouseX
        const my = s.mouseY
        const mouseRadius = 120
        const mouseRadiusSq = mouseRadius * mouseRadius

        s.textSize(CELL - 1)
        s.textAlign(s.CENTER, s.CENTER)

        for (let col = 0; col < cols; col++) {
          const cx = col * CELL + CELL / 2
          for (let row = 0; row < rows; row++) {
            const cy = row * CELL + CELL / 2

            const noiseVal = s.noise(col * 0.08, row * 0.08 + offset * 0.01)
            const ch =
              textChars[
                Math.floor(noiseVal * textChars.length) % textChars.length
              ]

            const dx = mx - cx
            const dy = my - cy
            const dSq = dx * dx + dy * dy

            if (dSq < mouseRadiusSq) {
              const d = Math.sqrt(dSq)
              const t = 1 - d / mouseRadius
              s.fill(c, c, c, dimAlpha + t * ((dark ? 220 : 200) - dimAlpha))
              s.textSize(CELL - 1 + t * 4)
              s.text(ch, cx, cy)
              s.textSize(CELL - 1)
            } else {
              s.fill(c, c, c, dimAlpha)
              s.text(ch, cx, cy)
            }
          }
        }

        if (!paused) offset += SCROLL_SPEED
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
