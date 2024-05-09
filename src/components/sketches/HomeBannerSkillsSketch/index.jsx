import { useEffect, useRef } from 'react'

const HomeBannerSkillsSketch = () => {
    const renderRef = useRef()

    useEffect(() => {
        const p5 = require("p5")

        let sRef
        let requireInit = true

        new p5(s => {
            sRef = s

            s.setup = () => {
                s.createCanvas(0, 0).parent(renderRef.current)
            }

            s.draw = () => {
                init()

                s.clear()
                s.rect(s.millis(), 40, 20, 20)
            }

            s.windowResized = () => {
                s.resizeCanvas(renderRef.current.offsetWidth, renderRef.current.offsetHeight)
            }

            const init = () => {
                if (requireInit) {
                    s.resizeCanvas(renderRef.current.offsetWidth, renderRef.current.offsetHeight)
                    requireInit = false
                }
            }
        })

        return () => {
            sRef.remove()
        }
    }, [])

    return(
        <div ref={renderRef} style={{width: '100%', height: '223px'}} />
    )
}

export default HomeBannerSkillsSketch