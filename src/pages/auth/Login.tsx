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
import { useRef } from "react"
import { saveToken } from "@/storage/Storage"
import { handleLogin } from "@/services/AuthService"
import { toast } from "react-hot-toast"
import { useAuth } from "@/auth/AuthProvider"

export default function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const { login, hasRole } = useAuth()

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()

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
      toast.success(data.message || "Login successful")
      
      if (hasRole("LIBRARY")) {
        navigate("/member/books")
      } else {
        navigate("/staff/books")
      }

    } catch (error: any) {
      toast.error(error.message || "Login failed")
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
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
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Login
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
