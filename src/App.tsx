import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/ui/navbar";
import { AuthProvider } from "./auth/AuthProvider";
import { Footer } from "./components/ui/footer";

function App() {
  return (
    <AuthProvider>
       <div className="min-h-screen flex flex-col">
        <BrowserRouter>
          <Navbar/>
          <Toaster
              position="top-center"
              toastOptions={{
                className: "text-lg px-6 py-4 rounded-lg shadow-lg",
                success: {
                  className: "bg-green-500 text-white font-semibold",
                  duration: 4000,
                },
                error: {
                  className: "bg-red-600 text-white font-semibold",
                  duration: 4000,
                },
              }}
            />
            <main className="pt-20">
              <AppRoutes/>
            </main>
          </BrowserRouter>
        </div>
      <Footer/>
    </AuthProvider>
  )
}

export default App
