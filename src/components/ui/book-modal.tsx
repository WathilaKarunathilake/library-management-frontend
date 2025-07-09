import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { BookData } from '@/models/BookModels'
import { BookOpen, CheckCircle, Trash2, Undo2, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type BookDetailsModalProps = {
  book: BookData | null
  open: boolean
  onClose: () => void
  onRemove?: (bookId: string) => void
  onBorrow?: (bookId: string) => void
  onReturn?: (bookId: string) => void
}

const BookDetailsModal = ({
  book,
  open,
  onClose,
  onRemove,
  onBorrow,
  onReturn,
}: BookDetailsModalProps) => {
  if (!book) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg [&>button[aria-label=Close]]:cursor-pointer">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>Full details about this book.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <span className="font-semibold">Availability:</span>
            <Badge
              variant={book.available ? 'default' : 'destructive'}
              className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 ${
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
          </p>

          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p>
            <span className="font-semibold">Year:</span> {book.publicationYear}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {book.category}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{' '}
            {book.description}
          </p>
        </div>

        {onRemove && book.available && (
          <div className="flex justify-end pt-4">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                onRemove(book.bookId)
                onClose()
              }}
            >
              <Trash2 className="w-4 h-4" />
              Remove Book
            </Button>
          </div>
        )}

        {onBorrow && book.available && (
          <div className="flex justify-end pt-4">
            <Button
              className="cursor-pointer"
              onClick={() => {
                onBorrow(book.bookId)
                onClose()
              }}
            >
              <BookOpen className="w-4 h-4" />
              Borrow Book
            </Button>
          </div>
        )}

        {onReturn && !book.available && (
          <div className="flex justify-end pt-4">
            <Button
              className="cursor-pointer"
              onClick={() => {
                onReturn(book.bookId)
                onClose()
              }}
            >
              <Undo2 className="w-4 h-4" />
              Return Book
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BookDetailsModal
