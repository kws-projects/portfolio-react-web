import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const SPACING = 32
const DOT_BASE = 2
const MOUSE_RADIUS = 120
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS

const DotGridSketch = () => {
  const renderRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
        s.frameRate(30)
        s.noStroke()
      }

      s.draw = () => {
        const bg = getThemeColor('--color-bg')
        const dark = isDarkTheme()
        s.background(bg[0], bg[1], bg[2])

        const dotAlpha = dark ? 25 : 35
        const hoverAlpha = dark ? 100 : 80
        const c = dark ? 240 : 20
        const mx = mouseRef.current.x
        const my = mouseRef.current.y

        for (let x = SPACING; x < s.width; x += SPACING) {
          for (let y = SPACING; y < s.height; y += SPACING) {
            const dx = mx - x
            const dy = my - y
            const dSq = dx * dx + dy * dy

            if (dSq < MOUSE_RADIUS_SQ) {
              const d = Math.sqrt(dSq)
              const t = d / MOUSE_RADIUS
              const scale = (1 - t) * 3.5
              const alpha = hoverAlpha - t * (hoverAlpha - dotAlpha)
              s.fill(c, c, c, alpha)
              s.ellipse(x, y, DOT_BASE + scale, DOT_BASE + scale)
            } else {
              s.fill(c, c, c, dotAlpha)
              s.ellipse(x, y, DOT_BASE, DOT_BASE)
            }
          }
        }
      }

      s.windowResized = () => {
        const parent = renderRef.current
        if (parent) s.resizeCanvas(parent.offsetWidth, parent.offsetHeight)
      }
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      sRef?.remove()
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" ref={renderRef} />
  )
}

export default DotGridSketch
