import { useEffect, useState } from "react"
import BookCard from "@/components/ui/book-card"
import { getBooks } from "@/services/BookService"
import type { BookData } from "@/models/BookModels"
import { borrowBooks } from "@/services/LibraryService"

const GetBooks = () => {
  const [books, setBooks] = useState<BookData[]>([])

  const borrowBook = async (bookId:string) => {
    try {
      const response = await borrowBooks(bookId)
      if (response) {
        loadBooks()
      }
    } catch (error) {
      console.error("Failed to load books:", error)
    }
  }

  const loadBooks = async () => {
    try {
      const response = await getBooks()
      setBooks(response)
    } catch (error) {
      console.error("Failed to load books:", error)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 bg-white">
      {books.map((book, index) => (
        <BookCard key={index} book={book} isStaff={false} onBorrow={borrowBook} />
      ))}
    </div>
  )
}

export default GetBooks
