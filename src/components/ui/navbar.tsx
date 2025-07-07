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

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, hasRole } = useAuth();

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 dark:bg-gray-900 shadow-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800 dark:text-white">
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
                      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    >
                      Books
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/members"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    >
                      Members
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/staff/add-book"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
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
                      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    >
                      Books
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/member/borrowings"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarFallback className="bg-black text-white">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 mt-2">
              <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
