import { useEffect, useState } from "react"
import BookCard from "@/components/ui/book-card"
import { getBooks, removeBookService } from "@/services/BookService"
import type { BookData } from "@/models/BookModels"
import { showErrorToast, showSuccessToast } from "@/components/files/toast"
import { Loader } from "@/components/ui/loader"

const ViewBooks = () => {
  const [books, setBooks] = useState<BookData[]>([])
  const [loading, setLoading] = useState(false)

  const loadBooks = async () => {
    setLoading(true)
    try {
      const response = await getBooks()
      setBooks(response)
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeBook = async (bookId: string) => {
    try {
      const response = await removeBookService(bookId)
      if (!response) {
        showErrorToast("Removing book failed")
      } else {
        showSuccessToast("Removed the book successfully")
        loadBooks()
      }
    } catch (error: any) {
      showErrorToast(error.message)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <div className="p-4 bg-white min-h-[200px]">
      {loading ? (
        <Loader/>
      ) : books.length === 0 ? (
        <p className="text-muted-foreground text-center mt-6">No books found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.bookId}
              book={book}
              isStaff={true}
              onRemove={() => removeBook(book.bookId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewBooks
