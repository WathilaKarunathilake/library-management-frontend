import { API_URL } from "@/config"
import type { NewBook } from "@/models/BookModels"
import { getToken } from "@/storage/Storage"
import axios from "axios"

const BOOK_URL = `${API_URL}/books`

export const getAllBooks = async (): Promise<any> => {
  const token = getToken() 
  const response = await axios.get(`${BOOK_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}

export const addBookApi = async (payload: NewBook): Promise<any> => {
  const token = getToken() 
  const response = await axios.post(`${BOOK_URL}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}

export const removeBookApi = async (bookId: string): Promise<any> => {
  const token = getToken()
  const response = await axios.delete(`${BOOK_URL}/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}