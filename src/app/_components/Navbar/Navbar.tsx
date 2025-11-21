"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faBars,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
  faChevronDown,
  faTimes,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "-/app/context/cartContext";
import { useWishlist } from "-/app/context/wishListContext";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const { cartDetails } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);


  // Check if a link is active
  const isActiveLink = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Function to get user initials
  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    
    const names = session.user.name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white shadow-md"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo + Links */}
          <div className="flex space-x-7 items-center">
            <Link href="/" className="flex items-center py-4">
              <span className="ml-2 font-bold text-indigo-700 text-2xl tracking-wide">
                Souq<span className="text-orange-500">Online</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className={`py-4 px-3 font-medium transition duration-300 rounded-md ${isActiveLink("/") ? "text-indigo-700 bg-indigo-50" : "text-gray-600 hover:text-indigo-700 hover:bg-gray-50"}`}
              >
                Home
              </Link>
              
              {/* Categories Dropdown */}
              {/* <div className="relative group">
                <button
                  onClick={toggleCategory}
                  className={`py-4 px-3 font-medium transition duration-300 rounded-md flex items-center ${isActiveLink("/categories") ? "text-indigo-700 bg-indigo-50" : "text-gray-600 hover:text-indigo-700 hover:bg-gray-50"}`}
                >
                  Categories
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
                </button>
                
                <div className="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link
                        href="/categories"
                        className="block px-4 py-2 text-sm font-medium text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
                      >
                        View All Categories
                      </Link>
                    </div>
                  </div>
                </div>
              </div> */}
              <CategoryDropdown/>


              <Link
                href="/products"
                className={`py-4 px-3 font-medium transition duration-300 rounded-md ${isActiveLink("/products") ? "text-indigo-700 bg-indigo-50" : "text-gray-600 hover:text-indigo-700 hover:bg-gray-50"}`}
              >
                Products
              </Link>
              
              <Link
                href="/brands"
                className={`py-4 px-3 font-medium transition duration-300 rounded-md ${isActiveLink("/brands") ? "text-indigo-700 bg-indigo-50" : "text-gray-600 hover:text-indigo-700 hover:bg-gray-50"}`}
              >
                Brands
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-4 pr-10 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-colors"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-indigo-700">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div> */}

{/* <SearchBar/> */}
          {/* Desktop Auth + Icons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-3 text-gray-500 hover:text-indigo-700 transition-colors rounded-full hover:bg-gray-100"
              title="Wishlist"
            >
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-3 text-gray-500 hover:text-indigo-700 transition-colors rounded-full hover:bg-gray-100"
              title="Cart"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              {cartDetails?.numOfCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartDetails.numOfCartItems}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              /* User Avatar with Dropdown */
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                    {getUserInitials()}
                  </div>
                  <span className="text-gray-700 font-medium text-sm max-w-[100px] truncate">
                    {session.user?.name || "User"}
                  </span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`text-xs transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} 
                  />
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/allorders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Register buttons for non-logged in users */
              <>
                <button
                  onClick={() => signIn()}
                  className="py-2 px-4 font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-indigo-700 transition-colors flex items-center"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Login
                </button>
                <Link
                  href="/register"
                  className="py-2 px-4 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link href="/cart" className="relative p-2 text-gray-600">
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              {cartDetails?.numOfCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartDetails?.numOfCartItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="outline-none p-2">
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-xl" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="text-gray-600 text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="px-4 pt-2 pb-4">
          {/* User info if logged in */}
          {isLoggedIn && (
            <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                {getUserInitials()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
            </div>
          )}
          
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-4 pr-10 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-gray-500">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          
          <div className="space-y-1">
            <Link
              href="/"
              className={`block py-3 px-4 rounded-md ${isActiveLink("/") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Home
            </Link>
            
            {/* <div>
              <button
                onClick={toggleCategory}
                className={`w-full text-left py-3 px-4 rounded-md flex items-center justify-between ${isActiveLink("/categories") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                Categories
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={`text-xs transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} 
                />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isCategoryOpen ? "max-h-96" : "max-h-0"}`}>
                <div className="pl-6 py-1 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block py-2 px-4 text-sm text-gray-600 rounded-md hover:bg-gray-50"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="block py-2 px-4 text-sm font-medium text-indigo-700 rounded-md hover:bg-indigo-50"
                  >
                    View All Categories
                  </Link>
                </div>
              </div>
            </div> */}

            <CategoryDropdown/>

            <Link
              href="/products"
              className={`block py-3 px-4 rounded-md ${isActiveLink("/products") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Products
            </Link>
            
            <Link
              href="/brands"
              className={`block py-3 px-4 rounded-md ${isActiveLink("/brands") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Brands
            </Link>
            
            <Link
              href="/wishlist"
              className={`block py-3 px-4 rounded-md flex items-center ${isActiveLink("/wishlist") ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Wishlist
              {wishlist.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Auth */}
          <div className="pt-4 mt-4 border-t border-gray-100">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block py-3 px-4 text-gray-600 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-3" />
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block py-3 px-4 text-gray-600 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />
                  My Orders
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full text-left py-3 px-4 text-gray-600 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="w-full text-left py-3 px-4 text-gray-600 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-3" />
                  Login
                </button>
                <Link
                  href="/register"
                  className="block py-3 px-4 text-indigo-700 rounded-md hover:bg-indigo-50 flex items-center mt-2 font-medium"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;