import apiClient from "@/components/files/client";

export const getMembersApi = async (): Promise<any> => { 
    const response = await apiClient.get(`/members`)
    return response
}