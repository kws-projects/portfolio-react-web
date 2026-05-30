import { useEffect, useState, useRef } from 'react'

type TextRevealProps = {
  text: string
  className?: string
  delay?: number
  speed?: number
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const TextReveal = ({
  text,
  className = '',
  delay = 0,
  speed = 30,
}: TextRevealProps) => {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let resolved = 0
    let tick = 0

    const animate = () => {
      tick++
      if (tick % 2 === 0 && resolved < text.length) {
        resolved++
      }

      const result = text
        .split('')
        .map((char, i) => {
          if (char === ' ' || char === '\n') return char
          if (i < resolved) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplay(result)

      if (resolved < text.length) {
        rafRef.current = window.setTimeout(animate, speed)
      } else {
        setDisplay(text)
      }
    }

    animate()
    return () => window.clearTimeout(rafRef.current)
  }, [started, text, speed])

  if (!started) return <span className={className}>&nbsp;</span>

  return <span className={className}>{display}</span>
}

export default TextReveal
