import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getMembers } from '@/services/MemberService'
import type { Member } from '@/models/MemberModel'
import { Search } from 'lucide-react'
import { showErrorToast } from '@/components/files/toast'
import { Loader } from '@/components/ui/loader'

export const ViewMembers = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [filterText, setFilterText] = useState('')
  const [loading, setLoading] = useState(false)

  const loadMembers = async () => {
    setLoading(true)
    try {
      const response = await getMembers()
      setMembers(response)
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [])

  const filteredMembers = members.filter(member =>
    `${member.name} ${member.memberType} ${member.staffType ?? ''}`
      .toLowerCase()
      .includes(filterText.toLowerCase())
  )

  const formatMemberType = (member: Member) => {
    if (member.memberType.toLowerCase() === 'library') return 'Library Member'
    if (member.memberType.toLowerCase() === 'staff') {
      const type = member.staffType?.toLowerCase()
      if (type === 'minor') return 'Staff (Minor)'
      if (type === 'management') return 'Staff (Management)'
      return 'Staff'
    }
    return member.memberType
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members List</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by name or type..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="rounded-xl border shadow-sm overflow-auto">
            <Table>
              <TableCaption className="my-5">
                Showing {filteredMembers.length} members
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Member ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Member Type</TableHead>
                  <TableHead>Books Borrowed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map(member => (
                  <TableRow key={member.memberID}>
                    <TableCell className="text-xs font-mono">
                      {member.memberID}
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{formatMemberType(member)}</TableCell>
                    <TableCell>{member.booksBorrowed ?? '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMembers.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No members match your search.
            </p>
          )}
        </>
      )}
    </div>
  )
}
