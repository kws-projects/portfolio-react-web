import { CSSProperties } from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  styles?: CSSProperties
  disabled?: boolean
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className="self-center px-5 py-2 rounded-md text-gray-200 font-medium bg-gray-800"
      style={props.styles}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
