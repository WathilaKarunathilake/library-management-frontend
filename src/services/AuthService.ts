import { loginUser, registerUser } from '@/features/AuthAPI'
import type {
  AuthData,
  LoginPayload,
  RegisterPayload,
} from '@/models/AuthModels'

export const handleRegister = async (
  payload: RegisterPayload
): Promise<AuthData> => {
  try {
    const response = await registerUser(payload)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const handleLogin = async (payload: LoginPayload): Promise<AuthData> => {
  try {
    const response = await loginUser(payload)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }
    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}
