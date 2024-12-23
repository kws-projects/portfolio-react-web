import { useEffect, useRef } from 'react'
import p5 from 'p5'

const WalkerBackgroundSketch = () => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      let requireInit = true
      let amount

      class Walker {
        x: number
        y: number
        tx: number
        ty: number

        constructor(x: number, y: number) {
          this.x = x
          this.y = y
          this.tx = x
          this.ty = y
        }

        show() {
          walkers.forEach(walker => {
            const dist = s.dist(this.x, this.y, walker.x, walker.y)
            if (dist < 200) {
              s.strokeWeight(0.15)
              s.stroke(0, s.map(dist, 0, 200, 255, 100))
              s.line(this.x, this.y, walker.x, walker.y)
              s.circle(this.x, this.y, 5)
            }
          })
        }
        update() {
          const d = s.dist(this.x, this.y, s.mouseX, s.mouseY)
          // update tx
          const dist = 50
          this.tx = this.tx + s.random(-dist, dist)
          this.ty = this.ty + s.random(-dist, dist)
          // lerp
          this.x =
            d > 100
              ? s.lerp(this.x, this.tx, 0.001)
              : s.lerp(this.x, this.tx, 0.01)
          this.y =
            d > 100
              ? s.lerp(this.y, this.ty, 0.001)
              : s.lerp(this.y, this.ty, 0.01)
          // out of canvas
          if (this.x < 0) this.tx = this.x + s.random(20, 50)
          if (this.y < 50) this.ty = this.y + s.random(20, 50)
          if (this.x > s.width) this.tx = this.x - s.random(20, 50)
          if (this.y > s.height - 200) this.ty = this.y - s.random(40, 50)
        }
      }

      const walkers: Walker[] = []

      s.setup = () => {
        s.createCanvas(0, 0).parent(renderRef.current)
      }

      s.draw = () => {
        init()

        s.clear()
        walkers.forEach(walker => {
          walker.show()
          walker.update()
        })
      }

      s.windowResized = () => {
        if (renderRef.current) {
          s.resizeCanvas(
            renderRef.current.offsetWidth,
            renderRef.current.offsetHeight
          )
        }
      }

      const init = () => {
        if (requireInit && renderRef.current) {
          s.resizeCanvas(
            renderRef.current.offsetWidth,
            renderRef.current.offsetHeight
          )

          amount = s.width < 577 ? 10 : 40

          for (let i = 0; i < amount; i++) {
            walkers.push(new Walker(s.random(s.width), s.random(s.height)))
          }

          requireInit = false
        }
      }
    })

    return () => {
      sRef.remove()
    }
  }, [])

  return (
    <div
      className="absolute top-0 left-0 w-full h-full -z-10"
      ref={renderRef}
    />
  )
}

export default WalkerBackgroundSketch
