import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { saveToken } from "@/storage/Storage"
import { handleLogin } from "@/services/AuthService"
import { useAuth } from "@/auth/AuthProvider"
import { getRoleFromToken } from "@/utils/jwt"
import { showErrorToast, showSuccessToast } from "@/components/files/toast"
import { Eye, EyeOff } from "lucide-react"

export default function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    console.log(user)
    if (user) {
      const role = user.roles.toString()
      navigator(role)
    }
  }, [user, navigate])
  
  const navigator = (role: string) => {
    switch (role) {
        case "LIBRARY":
          navigate("/member/books")
          break
        case "STAFF":
          navigate("/staff/books")
          break
      }
  }

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      const data = await handleLogin(payload)
      saveToken(data.token)
      login(data.token)
      showSuccessToast("Login successfully !")
      
      const role = getRoleFromToken(data.token)
      navigator(role!)
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={loginUser}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        placeholder="Abc#123"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Logging in...</span>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
