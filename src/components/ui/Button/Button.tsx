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
      className="self-center px-5 py-2 rounded-md text-gray-200 font-medium bg-gray-800"
      style={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
