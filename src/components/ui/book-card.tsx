import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import type { BookData } from "@/models/BookModels"

export default function BookCard({
  book,
  isStaff,
  onBorrow,
  onReturn,
  onRemove,
}: {
  book: BookData
  isStaff: boolean
  onBorrow?: (bookId: string) => void
  onReturn?: (bookId: string) => void
  onRemove?: (bookId: string) => void
}) {
  const truncateDescription = (description: string, wordLimit: number = 100): string => {
    if (!description) return "";
    const words = description.trim().split(/\s+/);
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(" ") + "…";
  }

  return (
    <Card className="w-full max-w-sm shadow-md h-96">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{book.title || "Untitled Book"}</CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author || "Unknown Author"}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Category:</span>
          <span>{book.category || "General"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Published:</span>
          <span>{book.publicationYear}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant={book.available ? "default" : "destructive"}>
            {book.available ? "Available" : "Not Available"}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-5 h-32">
          {truncateDescription(book.description, 50)}
        </p>

        {!isStaff && onBorrow && (
          <div className="pt-2">
            <Button
              disabled={!book.available}
              className="w-full cursor-pointer"
              onClick={() => onBorrow(book.bookId)}
            >
              Borrow Book
            </Button>
          </div>
        )}

        {!isStaff && onReturn && (
          <div className="pt-2">
            <Button
              disabled={book.available}
              className="w-full cursor-pointer"
              onClick={() => onReturn(book.bookId)}
            >
              Return Book
            </Button>
          </div>
        )}

        {isStaff && onRemove && (
          <div className="pt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive cursor-pointer"
              onClick={() => onRemove(book.bookId)}
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
