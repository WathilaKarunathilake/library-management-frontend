import { API_URL } from "@/config";
import { getToken } from "@/storage/Storage";
import axios from "axios";

const MEMBER_URL = `${API_URL}/members`

export const getMembersApi = async (): Promise<any> => { 
    const token = getToken() 
    const response = await axios.get(`${MEMBER_URL}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response
}