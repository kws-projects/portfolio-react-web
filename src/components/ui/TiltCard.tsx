import { useRef, useState, ReactNode, CSSProperties } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  tiltDeg?: number
}

const TiltCard = ({
  children,
  className = '',
  style,
  tiltDeg = 6,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(
      `perspective(600px) rotateX(${-y * tiltDeg}deg) rotateY(${x * tiltDeg}deg) scale3d(1.02, 1.02, 1.02)`
    )
  }

  const handleMouseLeave = () => {
    setTransform('')
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ ...style, transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default TiltCard
