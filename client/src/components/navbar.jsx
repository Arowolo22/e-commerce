import { useState, useEffect } from "react";
import { Heart, Search, ShoppingBag, Menu } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user] = useAuthState(auth);

  // Close dropdown when user logs out
  useEffect(() => {
    if (!user) setDropdownOpen(false);
  }, [user]);

  // Get first name from displayName or email
  const getFirstName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "";
  };

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    
  };

  return (
    <>
      <nav className="w-full bg-gray-50 border-b-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side: Website Name and Hamburger */}
            <div className="flex items-center min-w-[180px]">
              {/* Hamburger for mobile */}
              <button
                className="md:hidden mr-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>
              <span className="font-bold text-2xl tracking-wide select-none">
                Vogue Vault
              </span>
              {/* Desktop links */}
              <div className="hidden md:flex space-x-8 ml-6">
                <a href="#" className="text-black font-medium">
                  All
                </a>
                <a href="#" className="text-black font-medium">
                  Clothes
                </a>
                <a href="#" className="text-black font-medium">
                  Electronics
                </a>
                <a href="#" className="text-black font-medium">
                  Furniture
                </a>
              </div>
            </div>
            {/* Right section */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Auth Greeting or Sign in */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    className="flex items-center text-black font-medium focus:outline-none"
                  >
                    Hi, {getFirstName()}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-red-900 border rounded shadow-lg z-10">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-white"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/login" className="text-black font-medium">
                  Sign in
                </a>
              )}
              {/* Divider */}
              <div className="h-6 border-l border-gray-300 mx-2" />
              {/* Icons */}
              <div className="flex items-center space-x-4">
                <button>
                  <Heart size={22} />
                </button>
                <button>
                  <Search size={22} />
                </button>
                <button>
                  <ShoppingBag size={22} />
                </button>
                <button className="bg-black rounded text-white p-1 pl-3 pr-3 ml-4">
                  AI Picks
                </button>
              </div>
            </div>
            {/* Mobile right-side icons */}
            <div className="flex md:hidden items-center space-x-4">
              <button>
                <Heart size={22} />
              </button>
              <button>
                <Search size={22} />
              </button>
              <button>
                <ShoppingBag size={22} />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu with transition */}
        <div
          className={`
            md:hidden bg-gray-50 border-t px-4 pb-4
            transition-all duration-500 ease-in-out
            ${
              menuOpen
                ? "opacity-100 max-h-96 translate-y-0"
                : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="flex flex-col space-y-4 mt-4">
            <a href="#" className="text-black font-medium">
              Women
            </a>
            <a href="#" className="text-black font-medium">
              Men
            </a>
            <a href="#" className="text-black font-medium">
              All Products
            </a>
            {/* Auth Greeting or Sign in */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center text-black font-medium focus:outline-none"
                >
                  Hi, {getFirstName()}
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="text-black font-medium">
                Sign in
              </a>
            )}
            <button className="bg-black rounded text-white p-2 mt-2">
              AI Picks
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
