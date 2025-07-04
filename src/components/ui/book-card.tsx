import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BookData } from "@/models/BookModels"

export default function BookCard({ book }: { book: BookData }) {
  return (
    <Card className="w-full max-w-sm shadow-md">
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
      </CardContent>
    </Card>
  )
}
