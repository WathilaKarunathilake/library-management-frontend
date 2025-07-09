import { Navigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'
import type { JSX } from 'react'

interface Props {
  children: JSX.Element
  roles?: ('STAFF' | 'LIBRARY')[]
}

export const ProtectedRoute = ({ children, roles }: Props) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" />

  if (roles && !roles.some(r => user.roles.includes(r))) {
    return <Navigate to="/unauthorized" />
  }

  return children
}
