import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addBook } from '@/services/BookService'
import { showErrorToast, showSuccessToast } from '@/components/files/toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  User,
  Tags,
  Calendar,
  FileText,
  Loader2,
  XCircle,
  PlusCircle,
} from 'lucide-react'

export default function AddBook() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const categories = [
    "Adventure",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Horror",
    "Biography",
    "History",
    "Self-Help",
    "Children"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)

    const newBook = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      category: formData.get('category') as string,
      publicationYear: Number(formData.get('year')),
      description: formData.get('description') as string,
    }

    try {
      setLoading(true)
      const response = await addBook(newBook)
      if (response) {
        showSuccessToast('Book added successfully!')
        form.reset()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        showErrorToast('Failed to add a new book')
      }
    } catch (err: any) {
      showErrorToast(err.message)
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add a New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="flex items-center gap-2">
                <User className="w-4 h-4" /> Author
              </Label>
              <Input
                id="author"
                name="author"
                placeholder="Enter author's name"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full space-y-2 overflow-visible relative">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <Tags className="w-4 h-4" /> Category
                </Label>
                <Select name="category" required>
                  <SelectTrigger id="category" className="w-full cursor-pointer">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="start" avoidCollisions={false}>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className='cursor-pointer'>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="year" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Publication Year
                </Label>
                <Select name="year" required>
                  <SelectTrigger id="year" className="w-full cursor-pointer">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="start" avoidCollisions={false}>
                    {Array.from({ length: 100 }, (_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <SelectItem key={year} value={year.toString()} className='cursor-pointer'>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a brief description about the book"
                className="h-32 resize-none"
              />
            </div>

            <div className="flex justify-between gap-4">
              <Button
                className="w-1/2 md:w-1/5 bg-red-600 hover:bg-red-700 cursor-pointer"
                type="button"
                onClick={clearForm}
                disabled={loading}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Clear
              </Button>

              <Button
                className="w-1/2 md:w-1/5 cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Book
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
