import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/auth/AuthProvider'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Book, LogOut } from 'lucide-react'

// Tailwind conditional class helper
const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, hasRole } = useAuth()

  const logoutUser = () => {
    logout()
    navigate('/login')
  }

  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  const isActive = (path: string) => location.pathname.startsWith(path)

  const roleLabel = hasRole('STAFF') ? 'STAFF' : 'MEMBER'

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 shadow-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Book className="w-6 h-6" />
          <Link to="/">LibraryMS</Link>
        </div>

        {user && (
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex gap-6">
              {hasRole('STAFF') ? (
                <>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/books"
                      className={cn(
                        'text-sm px-3 py-2 rounded-md transition-all duration-200',
                        isActive('/staff/books')
                          ? 'text-black font-bold dark:bg-blue-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 hover:font-medium'
                      )}
                    >
                      Books
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/members"
                      className={cn(
                        'text-sm px-3 py-2 rounded-md transition-all duration-200',
                        isActive('/staff/members')
                          ? 'text-black font-bold dark:bg-blue-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 hover:font-medium'
                      )}
                    >
                      Members
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/add-book"
                      className={cn(
                        'text-sm px-3 py-2 rounded-md transition-all duration-200',
                        isActive('/staff/add-book')
                          ? 'text-black font-bold dark:bg-blue-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 hover:font-medium'
                      )}
                    >
                      Add Books
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link
                      to="/member/books"
                      className={cn(
                        'text-sm px-3 py-2 rounded-md transition-all duration-200',
                        isActive('/member/books')
                          ? 'text-black font-bold dark:bg-blue-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 hover:font-medium'
                      )}
                    >
                      Books
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/member/borrowings"
                      className={cn(
                        'text-sm px-3 py-2 rounded-md transition-all duration-200',
                        isActive('/member/borrowings')
                          ? 'text-black font-bold dark:bg-blue-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 hover:font-medium'
                      )}
                    >
                      My Borrowings
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {user ? (
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500">{roleLabel}</div>
                  </div>
                  <Avatar className="w-8 h-8 ring-2 ring-gray-300 dark:ring-gray-600 hover:ring-gray-400 dark:hover:ring-gray-500 transition">
                    <AvatarFallback className="bg-black text-white text-sm">
                      {user.name?.[0]?.toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 mt-2 transition-opacity duration-150 ease-in-out"
                align="end"
                forceMount
              >
                <div className="px-3 py-2 text-sm text-gray-500 border-b">
                  Role: {roleLabel}
                </div>
                <DropdownMenuItem
                  onClick={logoutUser}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-sm cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              className="text-sm cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}