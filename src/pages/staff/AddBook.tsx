import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddBook() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter book title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Enter author's name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Enter category" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Publication Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="Enter publication year"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Write a brief description about the book"
                    className="h-32 resize-none"
                    />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Add Book</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
