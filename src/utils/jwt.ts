import type { JwtPayload } from "@/models/AuthModels"
import { jwtDecode } from "jwt-decode"

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.sub
  } catch (error) {
    console.error("Invalid token", error)
    return null
  }
}

export const getRoleFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.role
  } catch (error) {
    console.error("Invalid token", error)
    return null
  }
}