import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const NODE_COUNT = 40
const CONNECT_DIST = 130
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST
const MOUSE_RADIUS = 180
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS

type Node = { x: number; y: number; vx: number; vy: number }

const ConstellationSketch = () => {
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

      const nodes: Node[] = []

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
        s.frameRate(30)

        for (let i = 0; i < NODE_COUNT; i++) {
          nodes.push({
            x: s.random(s.width),
            y: s.random(s.height),
            vx: s.random(-0.3, 0.3),
            vy: s.random(-0.3, 0.3),
          })
        }
      }

      s.draw = () => {
        const bg = getThemeColor('--color-bg')
        const dark = isDarkTheme()
        s.background(bg[0], bg[1], bg[2])

        const c = dark ? 240 : 20
        const mx = mouseRef.current.x
        const my = mouseRef.current.y

        for (const node of nodes) {
          node.x += node.vx
          node.y += node.vy

          if (node.x < 0 || node.x > s.width) node.vx *= -1
          if (node.y < 0 || node.y > s.height) node.vy *= -1

          const dx = mx - node.x
          const dy = my - node.y
          const dmSq = dx * dx + dy * dy
          if (dmSq < MOUSE_RADIUS_SQ) {
            const t = 1 - Math.sqrt(dmSq) / MOUSE_RADIUS
            node.x -= dx * t * 0.01
            node.y -= dy * t * 0.01
          }
        }

        s.strokeWeight(0.6)
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i]
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dSq = dx * dx + dy * dy
            if (dSq < CONNECT_DIST_SQ) {
              const d = Math.sqrt(dSq)
              const alpha = (1 - d / CONNECT_DIST) * (dark ? 40 : 35)
              s.stroke(c, c, c, alpha)
              s.line(a.x, a.y, b.x, b.y)
            }
          }
        }

        s.noStroke()
        const baseAlpha = dark ? 30 : 40
        for (const node of nodes) {
          const dx = mx - node.x
          const dy = my - node.y
          const dmSq = dx * dx + dy * dy
          const near = dmSq < MOUSE_RADIUS_SQ
          const size = near
            ? 2.5 + (1 - Math.sqrt(dmSq) / MOUSE_RADIUS) * 1.5
            : 2.5
          const alpha = near
            ? baseAlpha +
              (1 - Math.sqrt(dmSq) / MOUSE_RADIUS) * (dark ? 90 : 60)
            : baseAlpha
          s.fill(c, c, c, alpha)
          s.ellipse(node.x, node.y, size, size)
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

export default ConstellationSketch
