import BookCard from '@/components/ui/book-card'
import type { BookData } from '@/models/BookModels'
import { getBorrowedBooksService, returnBooks } from '@/services/LibraryService'
import { useEffect, useState } from 'react'

export const GetBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BookData[]>([]) 

  const returnBook = async (bookId: string) => {
    try {
      const response = await returnBooks(bookId)
      if (response) {
        getBorrowedBooks()
      }
    } catch (error) {
      console.error("Failed to return book:", error)
    }
  }

  const getBorrowedBooks = async () => {
    try {
      const response = await getBorrowedBooksService()
      setBorrowedBooks(response)
    } catch (error) {
      console.error("Failed to fetch borrowed books:", error)
    }
  }

  useEffect(() => {
    getBorrowedBooks()
  }, [])

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 bg-white">
      {borrowedBooks.map((book, index) => (
        <BookCard
          key={index}
          book={book}
          isStaff={false}
          onReturn={returnBook} 
        />
      ))}
    </div>
  )
}
