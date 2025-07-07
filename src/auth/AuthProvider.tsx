import { createContext, useContext, useEffect, useState } from "react"
import {jwtDecode} from "jwt-decode"
import { getToken, removeToken } from "@/storage/Storage"

type Role = "STAFF" | "LIBRARY"

interface User {
  name: string,
  email: string
  roles: Role[]
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
  hasRole: (role: Role) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = getToken()
    if (stored) login(stored)
  }, [])

  const login = (jwt: string) => {
    try {
      const decoded: any = jwtDecode(jwt)
      setToken(jwt)
      setUser({ email: decoded.email, roles: decoded.role, name: decoded.name })
    } catch (e) {
      console.error("Invalid token", e)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    removeToken()
  }

  const hasRole = (role: Role) => user?.roles.includes(role) ?? false

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used in AuthProvider")
  return ctx
}
