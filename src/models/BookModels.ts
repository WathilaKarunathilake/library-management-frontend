export interface BookData {
  title?: string
  author?: string
  category?: string
  description?: string
  publicationYear: number
  available: boolean
}

export interface BookResponse {
  success: boolean
  data: BookData
}