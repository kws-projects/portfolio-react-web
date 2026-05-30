import { CSSProperties } from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  styles?: CSSProperties
  disabled?: boolean
}

const Button = ({ children, onClick, styles, disabled }: ButtonProps) => {
  return (
    <button
      className="self-center px-6 py-2.5 rounded-xl text-primary font-medium bg-accent/20 border border-accent/30 hover:bg-accent/30 hover:border-accent/50 transition-all duration-200 disabled:opacity-40"
      style={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
