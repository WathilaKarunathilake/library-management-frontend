export interface Member {
  memberID: string
  name: string
  email: string
  memberType: string
  token?: string
  booksBorrowed?: number
  staffType?: string
}
