import type { BookData } from '@/models/BookModels'
import { BookList } from './book-list'
import { BookGrid } from './book-grid'

export default function BookCard({
  book,
  isStaff,
  onBorrow,
  onReturn,
  onRemove,
  viewMode = 'grid',
}: {
  book: BookData
  isStaff: boolean
  onBorrow?: (bookId: string) => void
  onReturn?: (bookId: string) => void
  onRemove?: (bookId: string) => void
  viewMode?: 'grid' | 'list'
}) {
  const truncateDescription = (
    description: string,
    wordLimit: number
  ): string => {
    if (!description) return ''
    const words = description.trim().split(/\s+/)
    if (words.length <= wordLimit) return description
    return words.slice(0, wordLimit).join(' ') + ' ...'
  }

  return viewMode === 'grid' ? (
    <BookGrid
      book={book}
      onBorrow={onBorrow}
      onRemove={onRemove}
      onReturn={onReturn}
      truncateDescription={truncateDescription}
      isStaff={isStaff}
    />
  ) : (
    <BookList
      book={book}
      onBorrow={onBorrow}
      onRemove={onRemove}
      onReturn={onReturn}
      truncateDescription={truncateDescription}
      isStaff={isStaff}
    />
  )
}
