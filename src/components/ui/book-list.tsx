import {
  BookOpen,
  Calendar,
  CheckCircle,
  Tag,
  Trash,
  Undo2,
  XCircle,
} from 'lucide-react'
import { Card, CardContent, CardTitle } from './card'
import { Badge } from './badge'
import type { BookData } from '@/models/BookModels'
import { Button } from './button'

export const BookList = ({
  book,
  isStaff,
  onBorrow,
  onReturn,
  onRemove,
  truncateDescription,
}: {
  book: BookData
  isStaff: boolean
  onBorrow?: (bookId: string) => void
  onReturn?: (bookId: string) => void
  onRemove?: (bookId: string) => void
  truncateDescription: (bookId: string, wordLimit: number) => string
}) => {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="">
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl font-semibold mb-1 truncate">
                  {book.title || 'Untitled Book'}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-3">
                  by {book.author || 'Unknown Author'}
                </p>
              </div>
              <Badge
                variant={book.available ? 'default' : 'destructive'}
                className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 ml-4 ${
                  book.available
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {book.available ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Available
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Not Available
                  </>
                )}
              </Badge>
            </div>

            <div className="flex items-center gap-6 mb-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>{book.category || 'General'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{book.publicationYear}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {truncateDescription(book.description, 40)}
            </p>
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            {!isStaff && onBorrow && (
              <Button
                disabled={!book.available}
                className="cursor-pointer min-w-[120px]"
                onClick={e => {
                  e.stopPropagation()
                  onBorrow(book.bookId)
                }}
              >
                <BookOpen className="w-4 h-4" />
                Borrow Book
              </Button>
            )}

            {!isStaff && onReturn && (
              <Button
                disabled={book.available}
                className="cursor-pointer min-w-[120px]"
                onClick={e => {
                  e.stopPropagation()
                  onReturn(book.bookId)
                }}
              >
                <Undo2 className="w-4 h-4" />
                Return Book
              </Button>
            )}

            {isStaff && onRemove && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive cursor-pointer self-end"
                onClick={e => {
                  e.stopPropagation()
                  onRemove(book.bookId)
                }}
                aria-label="Remove book"
              >
                <Trash className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
