import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/AppRoutes'
import Navbar from './components/ui/navbar'
import { AuthProvider } from './auth/AuthProvider'
import { Footer } from './components/ui/footer'
import { Toaster } from 'sonner'

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'border shadow-md',
        }}
      />

      <div className="min-h-screen flex flex-col">
        <BrowserRouter>
          <Navbar />
          <main className="pt-20">
            <AppRoutes />
          </main>
        </BrowserRouter>
      </div>
      <Footer />
    </AuthProvider>
  )
}

export default App
