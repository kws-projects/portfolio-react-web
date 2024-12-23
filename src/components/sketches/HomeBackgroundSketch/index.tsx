import { useEffect, useRef } from 'react'
import p5 from 'p5'

const HomeBackgroundSketch = () => {
  const renderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sRef: any

    new p5(s => {
      sRef = s

      let requireInit = true

      let center: number, start: number, end: number
      let pms: number, ts: number
      let cPos: number[][],
        cPath: number[][],
        cOffset: number[][],
        lsPos: number[][],
        lsPath: number[][],
        rsPos: number[][],
        rsPath: number[][]
      const amt = 0.03

      s.setup = () => {
        s.createCanvas(0, 0).parent(renderRef.current)
        s.noStroke()
        s.rectMode(s.CENTER)
        s.ellipseMode(s.CENTER)
      }

      s.draw = () => {
        init()

        s.background(249, 250, 252)

        if (s.millis() - pms > 1000) {
          ts++

          if (ts % 3 === 0) {
            const temp = Math.floor(s.random(0, 6))
            cOffset[temp][0] = s.random(-100, 100)
            cOffset[temp][1] = s.random(-100, 100)
          }

          pms = s.millis()
        }

        // show
        s.noFill()
        s.stroke(100)
        s.beginShape()
        cPos.forEach(e => s.vertex(e[0], e[1]))
        s.endShape(s.CLOSE)
        s.noStroke()
        s.fill(100)
        cPos.forEach(e => s.ellipse(e[0], e[1], e[2], e[2]))

        // update
        for (let i = 0; i < cPos.length; i++) {
          let isSelected = false
          // if is not selected
          if (s.mouseIsPressed) {
            //if (mouseX<270 || mouseX>1210 || mouseY<320 || mouseY>710) {
            if (
              s.dist(s.mouseX, s.mouseY, cPos[i][0], cPos[i][1]) <
              cPos[i][2] / 2
            ) {
              isSelected = true
            }
            //}
          }
          if (isSelected) {
            cPos[i][0] = s.mouseX
            cPos[i][1] = s.mouseY
          } else {
            cPos[i][0] = s.lerp(cPos[i][0], cPath[i][0] + cOffset[i][0], amt)
            cPos[i][1] = s.lerp(cPos[i][1], cPath[i][1] + cOffset[i][1], amt)
            cPos[i][2] = s.lerp(cPos[i][2], cPath[i][2], amt)
          }
        }
        for (let i = 0; i < lsPos.length; i++) {
          lsPos[i][0] = s.lerp(lsPos[i][0], lsPath[i][0], amt)
        }
        for (let i = 0; i < rsPos.length; i++) {
          rsPos[i][0] = s.lerp(rsPos[i][0], rsPath[i][0], amt)
        }

        drawBackground()
      }

      s.windowResized = () => {
        if (renderRef.current) {
          s.resizeCanvas(renderRef.current.offsetWidth, 970)
          center = s.width / 2
          start = center - 525
          end = center + 525
          updatePath()
        }
      }

      const init = () => {
        if (requireInit && renderRef.current) {
          s.resizeCanvas(renderRef.current.offsetWidth, 970)

          center = s.width / 2
          start = center - 525
          end = center + 525
          pms = s.millis()
          ts = 0

          updatePath()
          initPos()

          requireInit = false
        }
      }

      function updatePath() {
        cPath = [
          [end + 450, s.height * 0.12, 130],
          [end - 125, s.height * 0.66, 200],
          [start + 30, s.height * 0.7, 130],
          [start - 390, s.height * 0.66, 60],
          [center - 100, s.height * 0.5, 130],
          [end + 20, s.height * 0.35, 60],
        ]
        lsPath = [
          [start - 190 - 80, s.height * 0.11],
          [start - 185 - 80, s.height * 0.11],
          [start - 180 - 80, s.height * 0.112],
          [center, s.height * 0.536 + 30],
          [center + 2, s.height * 0.54 + 30],
          [center, s.height * 0.544 + 30],
          [start - 395 - 50, s.height * 0.88 - 60],
          [start - 400 - 50, s.height * 0.88 - 60],
          [start - 405 - 50, s.height * 0.876 - 60],
          [start - 800, s.height * 0.35 - 70],
        ]
        rsPath = [
          [end + 450, s.height * 0.4],
          [end + 750, s.height * 0.52],
          [end + 500, s.height * 0.8],
          [end - 40, s.height * 0.574 + 50],
          [end - 42, s.height * 0.57 + 50],
          [end - 40, s.height * 0.566 + 50],
        ]
      }

      function initPos() {
        // circle
        cPos = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]
        cPos.forEach(e => {
          e[0] = s.random(-500, s.width + 500)
          e[1] = s.random(-500, -100)
          e[2] = s.random(30, 200)
        })
        cOffset = [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ]
        // left shape
        lsPos = [
          [lsPath[0][0] - 500, s.height * 0.11],
          [lsPath[1][0] - 500, s.height * 0.11],
          [lsPath[2][0] - 500, s.height * 0.112],
          [lsPath[3][0] - 500, s.height * 0.536 + 30],
          [lsPath[4][0] - 500, s.height * 0.54 + 30],
          [lsPath[5][0] - 500, s.height * 0.544 + 30],
          [lsPath[6][0] - 500, s.height * 0.88 - 60],
          [lsPath[7][0] - 500, s.height * 0.88 - 60],
          [lsPath[8][0] - 500, s.height * 0.876 - 60],
          [lsPath[9][0] - 500, s.height * 0.35 - 70],
        ]
        // right shape
        rsPos = [
          [rsPath[0][0] + 500, s.height * 0.4],
          [rsPath[1][0] + 500, s.height * 0.52],
          [rsPath[2][0] + 500, s.height * 0.8],
          [rsPath[3][0] + 500, s.height * 0.574 + 50],
          [rsPath[4][0] + 500, s.height * 0.57 + 50],
          [rsPath[5][0] + 500, s.height * 0.566 + 50],
        ]
      }

      function drawBackground() {
        s.noStroke()
        s.fill('rgba(0, 0, 0, 0.68)')
        // left <>
        s.beginShape()
        lsPos.forEach(e => s.vertex(e[0], e[1]))
        s.endShape()
        // right <>
        s.beginShape()
        rsPos.forEach(e => s.vertex(e[0], e[1]))
        s.endShape()
      }
    })

    return () => {
      sRef.remove()
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full -z-10" ref={renderRef}></div>
  )
}

export default HomeBackgroundSketch
