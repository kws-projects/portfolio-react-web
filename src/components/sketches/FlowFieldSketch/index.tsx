import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const SCALE = 20
const PARTICLE_COUNT = 200

const FlowFieldSketch = () => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      let cols: number, rows: number
      let zOff = 0
      const particles: {
        x: number
        y: number
        prevX: number
        prevY: number
        speed: number
        hueShift: number
      }[] = []

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
        cols = Math.floor(s.width / SCALE)
        rows = Math.floor(s.height / SCALE)

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const px = s.random(s.width)
          const py = s.random(s.height)
          particles.push({
            x: px,
            y: py,
            prevX: px,
            prevY: py,
            speed: s.random(0.4, 1.5),
            hueShift: s.random(1),
          })
        }

        const bg = getThemeColor('--color-bg')
        s.background(bg[0], bg[1], bg[2])
      }

      s.draw = () => {
        const bg = getThemeColor('--color-bg')
        const dark = isDarkTheme()
        s.noStroke()
        s.fill(bg[0], bg[1], bg[2], dark ? 12 : 18)
        s.rect(0, 0, s.width, s.height)

        const accent = getThemeColor('--color-accent')
        const secondary = getThemeColor('--color-accent-secondary')

        for (const p of particles) {
          const col = Math.floor(p.x / SCALE)
          const row = Math.floor(p.y / SCALE)

          const safeCol = Math.max(0, Math.min(col, cols - 1))
          const safeRow = Math.max(0, Math.min(row, rows - 1))

          let angle = s.noise(safeCol * 0.1, safeRow * 0.1, zOff) * s.TWO_PI * 2

          const mouseDistX = p.x - s.mouseX
          const mouseDistY = p.y - s.mouseY
          const mouseDist = Math.sqrt(
            mouseDistX * mouseDistX + mouseDistY * mouseDistY
          )
          if (mouseDist < 150) {
            const force = s.map(mouseDist, 0, 150, 1.5, 0)
            angle += Math.atan2(mouseDistY, mouseDistX) * force
          }

          p.prevX = p.x
          p.prevY = p.y
          p.x += s.cos(angle) * p.speed
          p.y += s.sin(angle) * p.speed

          if (
            p.x < -10 ||
            p.x > s.width + 10 ||
            p.y < -10 ||
            p.y > s.height + 10
          ) {
            p.x = s.random(s.width)
            p.y = s.random(s.height)
            p.prevX = p.x
            p.prevY = p.y
          }

          const c = p.hueShift > 0.5 ? accent : secondary
          const alpha = dark ? 50 : 35
          s.stroke(c[0], c[1], c[2], alpha)
          s.strokeWeight(dark ? 1 : 0.8)
          s.line(p.prevX, p.prevY, p.x, p.y)
        }

        zOff += 0.0008
      }

      s.windowResized = () => {
        const parent = renderRef.current
        if (parent) {
          s.resizeCanvas(parent.offsetWidth, parent.offsetHeight)
          const bg = getThemeColor('--color-bg')
          s.background(bg[0], bg[1], bg[2])
        }
      }
    })

    return () => {
      sRef?.remove()
    }
  }, [])

  return <div className="absolute inset-0 -z-10" ref={renderRef} />
}

export default FlowFieldSketch
