import { useEffect, useRef } from 'react'
import p5, { Font } from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const DOT_SIZE = 5
const SPACING = 7
const MOUSE_RADIUS = 80

const PageTitleSketch = ({ title = '' }: { title: string }) => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      let font: Font
      let points: { x: number; y: number; homeX: number; homeY: number }[] = []
      let ready = false

      s.preload = () => {
        font = s.loadFont('/assets/fonts/quicksand/Quicksand-Medium.ttf')
      }

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
        buildPoints()
      }

      const buildPoints = () => {
        if (!title) return
        const fontSize = s.width < 600 ? 28 : 44
        const rawPoints = font.textToPoints(title, 0, 0, fontSize, {
          sampleFactor: 0.15,
        })

        const bounds = font.textBounds(title, 0, 0, fontSize) as {
          x: number
          y: number
          w: number
          h: number
        }

        const offsetX = (s.width - bounds.w) / 2 - bounds.x
        const offsetY = (s.height - bounds.h) / 2 - bounds.y

        points = rawPoints.map(pt => ({
          x: pt.x + offsetX + s.random(-200, 200),
          y: pt.y + offsetY + s.random(-200, 200),
          homeX: pt.x + offsetX,
          homeY: pt.y + offsetY,
        }))

        ready = true
      }

      s.draw = () => {
        if (!ready) return

        const bg = getThemeColor('--color-bg')
        const accent = getThemeColor('--color-accent')
        const secondary = getThemeColor('--color-accent-secondary')
        const dark = isDarkTheme()

        s.background(bg[0], bg[1], bg[2])
        s.noStroke()

        for (const pt of points) {
          const dx = s.mouseX - pt.x
          const dy = s.mouseY - pt.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            pt.x -= (dx / dist) * force * 8
            pt.y -= (dy / dist) * force * 8
          }

          pt.x += (pt.homeX - pt.x) * 0.08
          pt.y += (pt.homeY - pt.y) * 0.08

          const distFromHome = Math.sqrt(
            (pt.x - pt.homeX) ** 2 + (pt.y - pt.homeY) ** 2
          )
          const isDisplaced = distFromHome > 3

          const c = isDisplaced ? secondary : accent
          const alpha = dark ? 200 : 180
          s.fill(c[0], c[1], c[2], alpha)
          s.ellipse(pt.x, pt.y, DOT_SIZE, DOT_SIZE)
        }

        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const d = s.dist(points[i].x, points[i].y, points[j].x, points[j].y)
            if (d < SPACING * 2.5) {
              s.stroke(accent[0], accent[1], accent[2], dark ? 20 : 12)
              s.strokeWeight(0.5)
              s.line(points[i].x, points[i].y, points[j].x, points[j].y)
              s.noStroke()
            }
          }
        }
      }

      s.windowResized = () => {
        const parent = renderRef.current
        if (parent) {
          s.resizeCanvas(parent.offsetWidth, parent.offsetHeight)
          buildPoints()
        }
      }
    })

    return () => {
      sRef?.remove()
    }
  }, [title])

  return <div className="w-full h-60" ref={renderRef} />
}

export default PageTitleSketch
