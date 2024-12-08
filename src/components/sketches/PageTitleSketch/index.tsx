import { useEffect, useRef } from 'react'
import p5, { Font } from 'p5'

const PageTitleSketch = ({ title = '' }: { title: string }) => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      class Circle {
        x: number
        y: number
        r: number
        c: number
        or: number
        tr: number

        constructor(x: number, y: number, r: number, c: number) {
          this.x = x
          this.y = y
          this.r = r
          this.or = r
          this.tr = r
          this.c = c
        }
        render() {
          s.fill(this.c)
          s.circle(s.width / 2 + this.x, s.height / 2 + this.y, this.r)
        }
        update() {
          const dist = s.dist(
            s.mouseX,
            s.mouseY,
            s.width / 2 + this.x,
            s.height / 2 + this.y
          )
          if (dist < 80) {
            this.tr = s.map(dist, 0, 80, this.or * 3, this.or)
            this.r = s.lerp(this.r, this.tr, 0.1)
          } else {
            this.r = s.lerp(this.r, this.or, 0.02)
          }
        }
      }

      const CHAR_WIDTH = 15.9
      const CHAR_HEIGHT = 43
      const NAV_HEIGHT = 50

      let requireInit = true

      let font: Font
      let circles: Circle[]
      let rows, cols
      const size = 10
      let targetHeight = -50
      let currHeight = -50

      s.preload = () => {
        font = s.loadFont('/assets/fonts/quicksand/Quicksand-Light.ttf')
      }

      s.setup = () => {
        s.createCanvas(0, 0).parent(renderRef.current)
      }

      s.draw = () => {
        init()

        s.background(249, 250, 252)

        circles.forEach(c => {
          c.render()
          c.update()
        })
        s.fill(50)
        s.textAlign(s.CENTER)
        s.textSize(36)
        s.textFont(font)
        const displayRows =
          Math.ceil((title?.length * CHAR_WIDTH) / s.width) || 1
        const screenHeight = s.height - NAV_HEIGHT
        const yPos =
          screenHeight / 2 + NAV_HEIGHT - (CHAR_HEIGHT / 2) * displayRows
        s.text(title, 0, yPos, s.width, CHAR_HEIGHT * displayRows)
        currHeight = s.lerp(currHeight, targetHeight, 0.1)
      }

      s.windowResized = () => {
        if (renderRef.current) {
          s.resizeCanvas(
            renderRef.current.offsetWidth,
            renderRef.current.offsetHeight
          )
          initCircles()
        }
      }

      const init = () => {
        if (requireInit && renderRef.current) {
          s.resizeCanvas(
            renderRef.current.offsetWidth,
            renderRef.current.offsetHeight
          )

          targetHeight = s.height / 1.75 + 35
          s.noStroke()

          initCircles()

          requireInit = false
        }
      }

      const initCircles = () => {
        const sizeOffset = 0.2
        rows = (s.height / size) * sizeOffset
        cols = (s.width / size) * sizeOffset

        circles = []
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const xPos = s.map(x, 0, cols, (s.width / 2) * -1, s.width / 2)
            const yPos = s.map(y, 0, rows, (s.height / 2) * -1, s.height / 2)
            circles.push(
              new Circle(xPos + size, yPos + size, size, s.random(220, 255))
            )
          }
        }
      }
    })

    return () => {
      sRef.remove()
    }
  }, [title])

  return <div className="w-full h-60" ref={renderRef} />
}

export default PageTitleSketch
