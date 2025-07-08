import BookCard from '@/components/ui/book-card'
import type { BookData } from '@/models/BookModels'
import { getBorrowedBooksService, returnBooks } from '@/services/LibraryService'
import { useEffect, useState } from 'react'
import { showErrorToast, showSuccessToast } from '@/components/files/toast'
import { Loader } from '@/components/ui/loader'

export const GetBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BookData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const returnBook = async (bookId: string) => {
    try {
      setLoading(true)
      const response = await returnBooks(bookId)
      if (response) {
        showSuccessToast("Book returned successfully!")
        getBorrowedBooks()
      } else {
        showErrorToast("Failed to return boook")
      }
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getBorrowedBooks = async () => {
    try {
      setLoading(true)
      const response = await getBorrowedBooksService()
      setBorrowedBooks(response)
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBorrowedBooks()
  }, [])

  return (
    <div className="p-6 bg-white min-h-[200px] flex flex-col items-center justify-center">
      {loading ? (
        <Loader/>
      ) : borrowedBooks.length === 0 ? (
        <p className="text-center text-gray-400 text-lg font-medium select-none">
          You have no borrowed books currently.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {borrowedBooks.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              isStaff={false}
              onReturn={returnBook}
            />
          ))}
        </div>
      )}
    </div>
  )
}
