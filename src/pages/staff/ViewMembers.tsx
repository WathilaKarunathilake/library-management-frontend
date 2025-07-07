import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { getMembers } from "@/services/MemberService"
import type { Member } from "@/models/MemberModel"

export const ViewMembers = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [filterText, setFilterText] = useState("")

  const loadMembers = async () => {
    try {
      const response = await getMembers()
      setMembers(response)
    } catch (error) {
      console.error("Failed to load members:", error)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [])

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.memberType} ${member.staffType ?? ""}`
      .toLowerCase()
      .includes(filterText.toLowerCase())
  )

  const formatMemberType = (member: Member) => {
    if (member.memberType === "library") return "Library Member"
    if (member.memberType === "staff") {
      const type = member.staffType
      if (type === "admin") return "Staff (Admin)"
      if (type === "assistant") return "Staff (Assistant)"
      return "Staff"
    }
    return member.memberType
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members List</h1>
        <Input
          type="text"
          placeholder="Search by name or type..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-64"
        />
      </div>

      <div className="rounded-xl border shadow-sm overflow-auto">
        <Table>
          <TableCaption>Showing {filteredMembers.length} members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Member Type</TableHead>
              <TableHead>Books Borrowed</TableHead>
              <TableHead>Staff Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.memberID}>
                <TableCell className="text-xs font-mono">{member.memberID}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{formatMemberType(member)}</TableCell>
                <TableCell>{member.booksBorrowed ?? "-"}</TableCell>
                <TableCell>{member.memberType === "staff" ? member.staffType : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredMembers.length === 0 && (
        <p className="text-muted-foreground text-sm">No members match your search.</p>
      )}
    </div>
  )
}
