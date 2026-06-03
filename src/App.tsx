import '@/utils/i18n'
import useDirection from '@/hooks/useDirection'
import AppRouter from '@/router'

function App() {
  useDirection()

  return <AppRouter />
}

export default App
