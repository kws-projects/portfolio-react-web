import { useEffect, useRef } from 'react'
import p5, { Graphics } from 'p5'

const NotFoundSketch = () => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let sRef: any
    let requireInit = true

    let bgGraphic: Graphics

    new p5(s => {
      sRef = s

      const FRAMERATE = 30
      const PIXEL_DENSITY = 6
      let rgbPixels: RGBPixel[] = []
      let notFoundTextHeight: number
      let frameCount: number
      let isFameCountStopped: boolean

      class RGBPixel {
        pos: number[]
        rPos: number[]
        gPos: number[]
        bPos: number[]
        color: number[]
        height: number

        constructor(x: number, y: number) {
          this.pos = [x, y]
          this.rPos = [x, y]
          this.gPos = [x + PIXEL_DENSITY, y]
          this.bPos = [x + PIXEL_DENSITY * 2, y]
          this.color = [255, 255, 255]
          this.height = PIXEL_DENSITY * 3
        }

        show() {
          s.fill(this.color[0], 0, 0)
          s.rect(this.rPos[0], this.rPos[1], PIXEL_DENSITY, this.height)
          s.fill(0, this.color[1], 0)
          s.rect(this.gPos[0], this.gPos[1], PIXEL_DENSITY, this.height)
          s.fill(0, 0, this.color[2])
          s.rect(this.bPos[0], this.bPos[1], PIXEL_DENSITY, this.height)
        }

        fill(r: number, g: number, b: number) {
          this.color[0] = r
          this.color[1] = g
          this.color[2] = b
        }
      }

      s.setup = () => {
        s.createCanvas(0, 0).parent(renderRef.current)
        s.frameRate(FRAMERATE)
      }

      s.draw = () => {
        if (requireInit) {
          init()
        } else if (!isFameCountStopped) {
          s.clear()

          rgbPixels.forEach(p => {
            p.show()
          })

          bgGraphic.background(40, 40, 40)
          bgGraphic.textSize(350)
          bgGraphic.fill(230, 230, 230)
          bgGraphic.text(
            '💩 404 NOT FOUND 💩',
            s.map(frameCount % 255, 160, 0, 0, 3300) - (3300 - s.width),
            notFoundTextHeight,
            3800,
            500
          )

          let graphicPixels = bgGraphic.get()
          let pixelCount = 0
          for (let x = 0; x < s.width; x += PIXEL_DENSITY * 3) {
            for (let y = 0; y < s.height; y += PIXEL_DENSITY * 3) {
              const c = graphicPixels.get(x, y)
              rgbPixels[pixelCount]?.fill(c[0], c[1], c[2])
              pixelCount++
            }
          }

          frameCount++
        }
      }

      s.mousePressed = () => {
        isFameCountStopped = !isFameCountStopped
      }

      s.windowResized = () => {
        if (renderRef.current) {
          s.resizeCanvas(
            renderRef.current.offsetWidth,
            renderRef.current.offsetHeight
          )

          requireInit = true
        }
      }

      const init = () => {
        if (requireInit && renderRef.current) {
          s.resizeCanvas(
            renderRef.current.offsetWidth,
            renderRef.current.offsetHeight
          )

          bgGraphic = s.createGraphics(s.width, s.height)
          notFoundTextHeight = s.height / 2 - 250
          frameCount = 0
          isFameCountStopped = false

          rgbPixels = []
          for (let x = 0; x < s.width; x += PIXEL_DENSITY * 3) {
            for (let y = 0; y < s.height; y += PIXEL_DENSITY * 3) {
              rgbPixels.push(new RGBPixel(x, y))
            }
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

export default NotFoundSketch
