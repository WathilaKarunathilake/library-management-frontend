import { API_URL } from "@/config"
import { getToken } from "@/storage/Storage"
import axios from "axios"

const AUTH_URL = `${API_URL}/books`

export const getAllBooks = async (): Promise<any> => {
  const token = getToken() 
  const response = await axios.get(`${AUTH_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}