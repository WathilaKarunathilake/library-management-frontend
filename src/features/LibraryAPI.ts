import apiClient from "@/components/files/client"
import type { LibraryPayload } from "@/models/LibraryModel"

export const borrowBookApi = async (payload: LibraryPayload): Promise<any> => { 
    const response = await apiClient.post(`/library/borrow`, payload)
    return response
}

export const returnBookApi = async (payload: LibraryPayload): Promise<any> => { 
    const response = await apiClient.post(`/library/return`, payload)
    return response
}

export const getBorrowedBooksApi = async (memberId: string): Promise<any> => { 
    const response = await apiClient.get(`/library/borrowings/${memberId}`)
    return response
}