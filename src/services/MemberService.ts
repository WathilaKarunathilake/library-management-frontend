import { getMembersApi } from '@/features/MemberAPI'
import type { Member } from '@/models/MemberModel'

export const getMembers = async (): Promise<Member[]> => {
  try {
    const response = await getMembersApi()

    if (!response.data.success) {
      throw new Error(response.data.data)
    }

    return response.data.data
  } catch (error: any) {
    throw new Error(error.response.data.data)
  }
}
