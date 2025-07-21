export interface BookData {
  bookId: string
  title: string
  author: string
  category: string
  description: string
  publicationYear: number
  available: boolean
}

export interface NewBook {
  title: string
  author: string
  category: string
  description: string
  publicationYear: number
}

export interface BookResponse {
  success: boolean
  data: BookData
}
