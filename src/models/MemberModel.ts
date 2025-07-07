export interface Member {
  memberID: string;           
  name: string;
  memberType: string;
  token?: string;
  booksBorrowed?: number;
  staffType?: string;
}