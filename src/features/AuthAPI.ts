import { API_URL } from "@/config"
import type { LoginPayload, RegisterPayload } from "@/models/AuthModels"
import axios from "axios"

// Base API URL
const AUTH_URL = `${API_URL}/auth`

export const registerUser = async (data: RegisterPayload): Promise<any> => {
  const response = await axios.post(`${AUTH_URL}/register`, data)
  console.log(response)
  console.log(response.data)
  return response
}

export const loginUser = async (data: LoginPayload): Promise<any> => {
  const response = await axios.post(`${AUTH_URL}/login`, data)
  return response
}