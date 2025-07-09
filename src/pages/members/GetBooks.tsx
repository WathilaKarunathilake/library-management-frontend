import { useEffect, useState } from 'react'
import BookCard from '@/components/ui/book-card'
import { getBooks } from '@/services/BookService'
import type { BookData } from '@/models/BookModels'
import { borrowBooks } from '@/services/LibraryService'
import { showErrorToast, showSuccessToast } from '@/components/files/toast'
import { Loader } from '@/components/ui/loader'
import BookDetailsModal from '@/components/ui/book-modal'
import { Search, Grid, List, BookOpen } from 'lucide-react'

const GetBooks = () => {
  const [books, setBooks] = useState<BookData[]>([])
  const [filteredBooks, setFilteredBooks] = useState<BookData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const loadBooks = async () => {
    setLoading(true)
    try {
      const response = await getBooks()
      setBooks(response)
      setFilteredBooks(response)
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  const handleCardClick = (book: BookData) => {
    setSelectedBook(book)
    setDialogOpen(true)
  }

  const borrowBook = async (bookId: string) => {
    setLoading(true)
    try {
      const response = await borrowBooks(bookId)
      if (response) {
        showSuccessToast('Book borrowed successfully!')
        loadBooks()
      } else {
        showErrorToast('Failed to borrow book')
      }
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = [...books]

    if (searchTerm) {
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredBooks(filtered)
  }, [books, searchTerm])

  const clearFilters = () => {
    setSearchTerm('')
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-black" size={28} />
              <h1 className="text-2xl font-bold text-gray-900">Browse Books</h1>
            </div>
            <p className="text-gray-600">
              {filteredBooks.length} of {books.length} books available to borrow
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

        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search books by title or author ..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500"
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-500 text-lg mb-2">
            {books.length === 0
              ? 'No books available to borrow.'
              : 'No books match your filters.'}
          </p>
          {books.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-800"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col items-center gap-5'
          }
        >
          {filteredBooks.map(book => (
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
                book={book}
                isStaff={false}
                onBorrow={borrowBook}
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
        onBorrow={borrowBook}
      />
    </div>
  )
}

export default GetBooks
