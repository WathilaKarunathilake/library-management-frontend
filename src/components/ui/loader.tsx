import { Loader2 } from 'lucide-react'

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
    </div>
  )
}
