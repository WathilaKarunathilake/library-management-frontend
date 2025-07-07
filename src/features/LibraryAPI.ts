import { API_URL } from "@/config"
import type { LibraryPayload } from "@/models/LibraryModel"
import { getToken } from "@/storage/Storage"
import axios from "axios"

const LIBRARY_URL = `${API_URL}/library`

export const borrowBookApi = async (payload: LibraryPayload): Promise<any> => { 
    const token = getToken() 
    const response = await axios.post(`${LIBRARY_URL}/borrow`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response
}

export const returnBookApi = async (payload: LibraryPayload): Promise<any> => { 
    const token = getToken() 
    const response = await axios.post(`${LIBRARY_URL}/return`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response
}

export const getBorrowedBooksApi = async (memberId: string): Promise<any> => { 
    const token = getToken() 
    const response = await axios.get(`${LIBRARY_URL}/borrowings/${memberId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response
}