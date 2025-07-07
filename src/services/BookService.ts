import { addBookApi, getAllBooks, removeBookApi } from "@/features/BookAPI";
import type { BookData, NewBook } from "@/models/BookModels";

export const getBooks = async (): Promise<BookData[]> => { 
    try {
        const response = await getAllBooks()
        if (!response.data.success) {
          throw new Error(response.data.data) 
        }
    
        return response.data.data
      } catch (error: any) {
        throw new Error(
          "Getting books failed"
        )
      }
}

export const addBook = async (payload: NewBook): Promise<any> => { 
    try {
        const response = await addBookApi(payload)
        if (!response.data.success) {
          throw new Error(response.data.data) 
        }
        return response.data.data
      } catch (error: any) {
        throw new Error(
          "Book adding failed"
        )
      }
}

export const removeBookService = async (bookId: string): Promise<any> => { 
    try {
        const response = await removeBookApi(bookId)
        if (!response.data.success) {
          throw new Error(response.data.data) 
        }
        return response.data.success
      } catch (error: any) {
        throw new Error(
          "Book removing failed"
        )
      }
}