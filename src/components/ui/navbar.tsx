import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Book, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, hasRole } = useAuth();

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const roleLabel = hasRole("STAFF") ? "STAFF" : "MEMBER";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 dark:bg-gray-900 shadow-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Book className="w-6 h-6" />
          <Link to="/">LibraryMS</Link>
        </div>

        {user && (
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex gap-6">
              {hasRole("STAFF") ? (
                <>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/books"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:font-bold px-3 py-2 rounded-md transition-all duration-200"
                    >
                      Books
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/members"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:font-bold px-3 py-2 rounded-md transition-all duration-200"
                    >
                      Members
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/add-book"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:font-bold px-3 py-2 rounded-md transition-all duration-200"
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
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:font-bold px-3 py-2 rounded-md transition-all duration-200"
                    >
                      Books
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/member/borrowings"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:font-bold px-3 py-2 rounded-md transition-all duration-200"
                    >
                      My Borrowings
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* User profile dropdown or login/signup */}
        {user ? (
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <DropdownMenu open={open} onOpenChange={setOpen}>
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
                      {user.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2" align="end">
                <div className="px-3 py-2 text-xs text-gray-500 border-b">
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
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="text-sm cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
