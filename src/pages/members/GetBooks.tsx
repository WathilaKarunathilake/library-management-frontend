import { useEffect, useState } from "react"
import BookCard from "@/components/ui/book-card"
import { getBooks } from "@/services/BookService"
import type { BookData } from "@/models/BookModels"
import { borrowBooks } from "@/services/LibraryService"
import { showErrorToast, showSuccessToast } from "@/components/files/toast"
import { Loader } from "@/components/ui/loader"

const GetBooks = () => {
  const [books, setBooks] = useState<BookData[]>([])
  const [loading, setLoading] = useState(true)

  const loadBooks = async () => {
    setLoading(true)
    try {
      const response = await getBooks()
      setBooks(response)
    } catch (error: any) {
      showErrorToast(error.message || "Failed to load books")
    } finally {
      setLoading(false)
    }
  }

  const borrowBook = async (bookId: string) => {
    setLoading(true)
    try {
      const response = await borrowBooks(bookId)
      if (response) {
        showSuccessToast("Book borrowed successfully!")
        loadBooks()
      } else {
        showErrorToast("Failed to borrow book")
      }
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <div className="min-h-screen p-6 bg-white">
      {loading ? (
        <Loader/>
      ) : books.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg font-medium select-none">
            No books available to borrow.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              isStaff={false}
              onBorrow={borrowBook}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GetBooks
