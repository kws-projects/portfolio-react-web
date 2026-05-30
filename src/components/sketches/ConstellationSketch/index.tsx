import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const NODE_COUNT = 50
const CONNECT_DIST = 140
const MOUSE_RADIUS = 180

type Node = {
  x: number
  y: number
  vx: number
  vy: number
}

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

          const dm = Math.sqrt((mx - node.x) ** 2 + (my - node.y) ** 2)
          if (dm < MOUSE_RADIUS) {
            const push = s.map(dm, 0, MOUSE_RADIUS, 0.5, 0)
            node.x += (node.x - mx) * push * 0.02
            node.y += (node.y - my) * push * 0.02
          }
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const d = s.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            if (d < CONNECT_DIST) {
              const alpha = s.map(d, 0, CONNECT_DIST, dark ? 40 : 35, 0)
              s.stroke(c, c, c, alpha)
              s.strokeWeight(0.6)
              s.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            }
          }
        }

        s.noStroke()
        for (const node of nodes) {
          const dm = Math.sqrt((mx - node.x) ** 2 + (my - node.y) ** 2)
          const size =
            dm < MOUSE_RADIUS ? s.map(dm, 0, MOUSE_RADIUS, 4, 2.5) : 2.5
          const alpha =
            dm < MOUSE_RADIUS
              ? s.map(dm, 0, MOUSE_RADIUS, dark ? 120 : 100, dark ? 30 : 40)
              : dark
                ? 30
                : 40
          s.fill(c, c, c, alpha)
          s.ellipse(node.x, node.y, size, size)
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
      window.removeEventListener('mousemove', handleMouseMove)
      sRef?.remove()
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" ref={renderRef} />
  )
}

export default ConstellationSketch
