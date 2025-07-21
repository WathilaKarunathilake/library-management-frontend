import BookCard from '@/components/ui/book-card'
import type { BookData } from '@/models/BookModels'
import { getBorrowedBooksService, returnBooks } from '@/services/LibraryService'
import { useEffect, useState } from 'react'
import { showErrorToast, showSuccessToast } from '@/components/files/toast'
import { Loader } from '@/components/ui/loader'
import { BookOpen, Grid, List } from 'lucide-react'
import BookDetailsModal from '@/components/ui/book-modal'

export const GetBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BookData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleCardClick = (book: BookData) => {
    setSelectedBook(book)
    setDialogOpen(true)
  }

  const returnBook = async (bookId: string) => {
    try {
      setLoading(true)
      const response = await returnBooks(bookId)
      if (response) {
        showSuccessToast('Book returned successfully!')
        getBorrowedBooks()
      } else {
        showErrorToast('Failed to return boook')
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
    <div className="min-h-screen p-6 bg-white">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-black" size={28} />
              <h1 className="text-2xl font-bold text-gray-900">
                Borrowed Books
              </h1>
            </div>
            <p className="text-gray-600">
              {borrowedBooks.length > 0
                ? borrowedBooks.length > 1
                  ? `${borrowedBooks.length} books borrowed`
                  : `1 book borrowed`
                : 'No books are borrowed'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`cursor-pointer p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-200'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`cursor-pointer p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-200'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : borrowedBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-500 text-lg mb-2">
            You have no borrowed books currently.
          </p>
        </div>
          
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col items-center gap-5'
          }
        >
          {borrowedBooks.map((book, index) => (
            <div
              key={book.bookId}
              onClick={() => handleCardClick(book)}
              className={`cursor-pointer ${
                viewMode === 'list'
                  ? 'max-w-none w-full'
                  : 'transition-transform hover:scale-105'
              }`}
            >
              <BookCard
                key={index}
                book={book}
                isStaff={false}
                onReturn={returnBook}
                viewMode={viewMode}
              />
            </div>
          ))}
        </div>
      )}

      <BookDetailsModal
        book={selectedBook}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onReturn={returnBook}
      />
    </div>
  )
}
