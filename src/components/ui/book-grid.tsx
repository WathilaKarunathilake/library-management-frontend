import { BookOpen, CheckCircle, Trash, Undo2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Badge } from './badge'
import type { BookData } from '@/models/BookModels'
import { Button } from './button'

export const BookGrid = ({
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
    <Card className="w-full max-w-sm shadow-md h-96">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {book.title || 'Untitled Book'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          by {book.author || 'Unknown Author'}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Category:</span>
          <span>{book.category || 'General'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Published:</span>
          <span>{book.publicationYear}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <Badge
            variant={book.available ? 'default' : 'destructive'}
            className={`px-2 text-sm rounded-full flex items-center gap-1 ${
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

        <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-normal h-32">
          {truncateDescription(book.description, 25)}
        </p>

        {!isStaff && onBorrow && (
          <Button
            disabled={!book.available}
            className="w-full cursor-pointer"
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
            className="w-full cursor-pointer"
            onClick={() => onReturn(book.bookId)}
          >
            <Undo2 className="w-4 h-4" />
            Return Book
          </Button>
        )}

        {isStaff && onRemove && (
          <div className="pt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive cursor-pointer"
              onClick={e => {
                e.stopPropagation()
                onRemove(book.bookId)
              }}
              aria-label="Remove book"
            >
              <Trash className="h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
