export interface RegisterPayload {
  name: string
  email: string
  password: string
  memberType: string
  staffType?: string | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthData {
  token: string
  message: string
}

export interface AuthResponse {
  success: boolean
  data: AuthData
}