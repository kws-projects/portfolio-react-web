import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { getThemeColor, isDarkTheme } from '@/utils/theme'

const WAVE_COUNT = 8
const MOUSE_RADIUS = 200

const WaveLineSketch = () => {
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

      let offset = 0

      s.setup = () => {
        const parent = renderRef.current
        if (!parent) return
        s.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
      }

      s.draw = () => {
        const bg = getThemeColor('--color-bg')
        const dark = isDarkTheme()
        s.background(bg[0], bg[1], bg[2])

        const c = dark ? 240 : 20
        const mx = mouseRef.current.x
        const my = mouseRef.current.y

        s.noFill()

        for (let w = 0; w < WAVE_COUNT; w++) {
          const baseY = ((w + 1) / (WAVE_COUNT + 1)) * s.height
          const baseAlpha = dark ? 18 : 25

          s.stroke(c, c, c, baseAlpha)
          s.strokeWeight(1)
          s.beginShape()

          for (let x = 0; x <= s.width; x += 4) {
            const noiseVal = s.noise(x * 0.003 + w * 0.5, offset + w * 0.3)
            let amplitude = 30 + w * 8

            const d = Math.sqrt((mx - x) ** 2 + (my - baseY) ** 2)
            if (d < MOUSE_RADIUS) {
              const boost = s.map(d, 0, MOUSE_RADIUS, 40, 0)
              amplitude += boost
              const alpha = s.map(d, 0, MOUSE_RADIUS, 60, baseAlpha)
              s.stroke(c, c, c, alpha)
            }

            const y = baseY + (noiseVal - 0.5) * amplitude * 2
            s.curveVertex(x, y)
          }

          s.endShape()
        }

        offset += 0.004
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

export default WaveLineSketch
