import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addBook } from "@/services/BookService";
import { showErrorToast, showSuccessToast } from "@/components/files/toast";
import { Loader2 } from "lucide-react";

export default function AddBook() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const newBook = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      publicationYear: Number(formData.get("year")),
      description: formData.get("description") as string,
    };

    try {
      setLoading(true);
      const response = await addBook(newBook);
      if (response) {
        showSuccessToast("Book added successfully!");
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        showErrorToast("Failed to add a new book")
      }
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add a New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter book title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" placeholder="Enter author's name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" placeholder="Enter category" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Publication Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="Enter publication year"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a brief description about the book"
                className="h-32 resize-none"
              />
            </div>

            <div className="flex justify-between gap-4">
              <Button
                className="w-1/5 bg-red-600"
                type="button"
                onClick={clearForm}
                disabled={loading}
              >
                Clear
              </Button>

              <Button className="w-1/5" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  "Add Book"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
