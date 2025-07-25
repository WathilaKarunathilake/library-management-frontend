import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { handleRegister } from '@/services/AuthService'
import { saveToken } from '@/storage/Storage'
import { useAuth } from '@/auth/AuthProvider'
import { getRoleFromToken } from '@/utils/jwt'
import { showErrorToast, showSuccessToast } from '@/components/files/toast'
import { Eye, EyeOff } from 'lucide-react'

const Register = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('library')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (user) {
      const role = user.roles.toString()
      navigator(role)
    }
  }, [user, navigate])

  const navigator = (role: string) => {
    switch (role) {
      case 'LIBRARY':
        navigate('/member/books')
        break
      case 'STAFF':
        navigate('/staff/books')
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)

    const payload = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
      memberType: (formData.get('role') as string) || '',
      staffType:
        role === 'staff' ? (formData.get('staffType') as string) : null,
    }

    try {
      const data = await handleRegister(payload)
      saveToken(data.token)
      login(data.token)

      showSuccessToast(data.message || 'Login successful')

      const role = getRoleFromToken(data.token)
      navigator(role!)
    } catch (error: any) {
      showErrorToast(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your details below to create account with us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Wathila Karunathilake"
                      required
                    />
                  </div>
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
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
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
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="border border-black bg-background px-3 py-2 rounded-md"
                      required
                    >
                      <option value="library">Library</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>

                  {role === 'staff' && (
                    <div className="grid gap-3">
                      <Label htmlFor="staffType">Staff Type</Label>
                      <select
                        id="staffType"
                        name="staffType"
                        className="border border-black bg-background px-3 py-2 rounded-md"
                        required
                      >
                        <option value="minor">Minor</option>
                        <option value="management">Management</option>
                      </select>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Signing up...</span>
                        </div>
                      ) : (
                        'Sign up'
                      )}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="underline underline-offset-4">
                    Log in
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

export default Register
