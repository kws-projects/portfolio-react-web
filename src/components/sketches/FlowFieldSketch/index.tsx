import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const SCALE = 20
const PARTICLE_COUNT = 150

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
        s.frameRate(30)
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
            speed: s.random(0.5, 1.8),
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
        s.fill(bg[0], bg[1], bg[2], dark ? 15 : 22)
        s.rect(0, 0, s.width, s.height)

        const accent = getThemeColor('--color-accent')
        const secondary = getThemeColor('--color-accent-secondary')
        const mx = s.mouseX
        const my = s.mouseY

        for (const p of particles) {
          const safeCol = Math.max(
            0,
            Math.min(Math.floor(p.x / SCALE), cols - 1)
          )
          const safeRow = Math.max(
            0,
            Math.min(Math.floor(p.y / SCALE), rows - 1)
          )

          let angle = s.noise(safeCol * 0.1, safeRow * 0.1, zOff) * s.TWO_PI * 2

          const dx = p.x - mx
          const dy = p.y - my
          const distSq = dx * dx + dy * dy
          if (distSq < 22500) {
            const force = 1 - Math.sqrt(distSq) / 150
            angle += Math.atan2(dy, dx) * force * 1.5
          }

          p.prevX = p.x
          p.prevY = p.y
          p.x += Math.cos(angle) * p.speed
          p.y += Math.sin(angle) * p.speed

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
          s.stroke(c[0], c[1], c[2], dark ? 50 : 35)
          s.strokeWeight(dark ? 1 : 0.8)
          s.line(p.prevX, p.prevY, p.x, p.y)
        }

        zOff += 0.001
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
