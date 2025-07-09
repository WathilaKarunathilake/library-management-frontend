import { useAuth } from '@/auth/AuthProvider'

export function Footer() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <footer className="w-full bg-black border-t border-gray-200 shadow-inner py-4 flex justify-center items-center">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} LibraryMS. All rights reserved.
      </p>
    </footer>
  )
}
