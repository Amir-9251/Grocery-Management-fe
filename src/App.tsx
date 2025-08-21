import AppRouter from './app/router/router'
import { ToastProvider } from './app/components/ui/ToastContainer'

function App() {

  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  )
}

export default App
