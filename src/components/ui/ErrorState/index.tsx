import { FaCircleXmark } from 'react-icons/fa6'
import Button from '@/components/ui/Button/Button'

type ErrorStateProps = {
  message: string
  onRetry?: () => void
  retryLabel?: string
}

const ErrorState = ({
  message,
  onRetry,
  retryLabel = 'Reload',
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col self-center m-12 gap-y-6">
      <FaCircleXmark className="self-center fill-gray-800" size={50} />
      <h1 className="text-2xl text-center">{message}</h1>
      {onRetry && <Button onClick={onRetry}>{retryLabel}</Button>}
    </div>
  )
}

export default ErrorState
