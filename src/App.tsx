import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {

  return (
     <BrowserRouter>
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
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
