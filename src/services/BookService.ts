import { getAllBooks } from "@/features/BookAPI";
import type { BookData } from "@/models/BookModels";

export const getBooks = async (): Promise<BookData[]> => { 
    try {
        const response = await getAllBooks()
        if (!response.data.success) {
          throw new Error(response.data.data) 
        }
    
        return response.data.data
      } catch (error: any) {
        throw new Error(
          "Registration failed"
        )
      }
}