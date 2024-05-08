import { useEffect, useRef } from 'react'

const Playground = () => {
    const renderRef = useRef()

    useEffect(() => {
        const p5 = require("p5")
        let requireInit = true

        new p5(s => {
            s.setup = () => {
                s.createCanvas(0, 0).parent(renderRef.current)
            }

            s.draw = () => {
                if (requireInit) {
                    s.resizeCanvas(renderRef.current.offsetWidth, 970)
                    requireInit = false
                }
            }

            s.windowResized = () => {
                s.resizeCanvas(renderRef.current.offsetWidth, 970)
                console.log('resized')
            }
        })
    }, [])

    return(
        <div ref={renderRef}></div>
    )
}

export default Playground;