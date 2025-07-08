import apiClient from "@/components/files/client"
import type { NewBook } from "@/models/BookModels"

export const getAllBooks = async (): Promise<any> => {
  const response = await apiClient.get(`/books`)
  return response
}

export const addBookApi = async (payload: NewBook): Promise<any> => {
  const response = await apiClient.post(`/books`, payload)
  return response
}

export const removeBookApi = async (bookId: string): Promise<any> => {
  const response = await apiClient.delete(`/books/${bookId}`)
  return response
}