import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getToken, removeToken } from '@/storage/Storage'

type Role = 'STAFF' | 'LIBRARY'

interface User {
  name: string
  email: string
  roles: Role[]
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
  hasRole: (role: Role) => boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

let globalLogout: (() => void) | null = null

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = getToken()
    if (stored) login(stored)
  }, [])

  const login = (jwt: string) => {
    try {
      const decoded: any = jwtDecode(jwt)
      setToken(jwt)
      console.log(decoded.role)
      setUser({
        email: decoded.email,
        roles: decoded.role,
        name: decoded.name,
      })
    } catch (e) {
      console.error('Invalid token', e)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    removeToken()
  }

  const hasRole = (role: Role) => user?.roles.includes(role) ?? false

  useEffect(() => {
    globalLogout = logout
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used in AuthProvider')
  return ctx
}

export function logoutUser() {
  if (globalLogout) globalLogout()
}
