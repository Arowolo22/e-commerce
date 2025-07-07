import { useState, useEffect } from "react";
import { Heart, Search, ShoppingBag, Menu } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../CartContext";

const Navbar = ({ selectedCategory }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { cartCount, fetchCartCount } = useCart();

  // Close dropdown when user logs out
  useEffect(() => {
    if (!user) setDropdownOpen(false);
  }, [user]);

  useEffect(() => {
    fetchCartCount();
  }, []);

  // Get first name from displayName or email
  const getFirstName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "";
  };

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    toast.success("User Logged out Successfully");
    navigate("/login");
  };

  // Helper function to get button styles based on selection
  const getButtonStyle = (category) => {
    const baseStyle = "font-medium transition-colors";
    const isSelected = selectedCategory === category;
    return `${baseStyle} ${
      isSelected ? "text-black font-semibold" : "text-black hover:text-gray-600"
    }`;
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
              <Link
                to="/home"
                className="font-bold text-2xl tracking-wide select-none hover:text-gray-700 transition-colors"
              >
                Vogue Vault
              </Link>
              {/* Desktop links */}
              <div className="hidden md:flex space-x-8 ml-6">
                <Link
                  to="/home/men"
                  className={getButtonStyle("men")}
                  onClick={() => setMenuOpen(false)}
                >
                  Men
                </Link>
                <Link
                  to="/home/women"
                  className={getButtonStyle("women")}
                  onClick={() => setMenuOpen(false)}
                >
                  Women
                </Link>
                <Link
                  to="/home/all"
                  className={getButtonStyle("all")}
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>
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
                <Link to="/login" className="text-black font-medium ">
                  {" "}
                  Sign in
                </Link>
              )}
              {/* Divider */}
              <div className="h-6 border-l border-gray-300 mx-2" />
              {/* Icons */}
              <div className="flex items-center space-x-4">
                <button onClick={() => navigate("/cart")} className="relative">
                  <ShoppingBag size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button>
                  <Search size={22} />
                </button>
                <button className="bg-black rounded text-white p-1 pl-3 pr-3 ml-4">
                  AI Picks
                </button>
              </div>
            </div>
            {/* Mobile right-side icons */}
            <div className="flex md:hidden items-center space-x-4">
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
            <Link
              to="/home/men"
              className={`${getButtonStyle("men")} text-left`}
              onClick={() => setMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/home/women"
              className={`${getButtonStyle("women")} text-left`}
              onClick={() => setMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              to="/home/all"
              className={`${getButtonStyle("all")} text-left`}
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>

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
              <Link to="/login" className="text-black font-medium ">
                {" "}
                Sign in
              </Link>
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
