import { addBookApi, getAllBooks, removeBookApi } from '@/features/BookAPI'
import type { BookData, NewBook } from '@/models/BookModels'

export const getBooks = async (): Promise<BookData[]> => {
  try {
    const response = await getAllBooks()
    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const addBook = async (payload: NewBook): Promise<boolean> => {
  try {
    const response = await addBookApi(payload)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }
    return response.data.success
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}

export const removeBookService = async (bookId: string): Promise<boolean> => {
  try {
    const response = await removeBookApi(bookId)
    if (!response.data.success) {
      throw new Error(response.data.data)
    }
    return response.data.success
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}
