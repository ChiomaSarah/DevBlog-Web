"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "../app-store/store";
import { resetUser } from "../app-store/authSlice";
import {
  PenTool,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(resetUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
    setIsUserDropdownOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-20 bg-teal-400 shadow-sm">
        <Link
          href="/"
          className="flex items-center space-x-1 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="p-2 rounded-full shadow-sm bg-white">
            <PenTool className="h-6 w-6 text-teal-500" />
          </div>
          <span
            className="
              font-bold text-xl bg-clip-text text-transparent 
              bg-gradient-to-r from-white/70 to-white/90 
            "
          >
            DevBlog
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-teal-800">
                  {user.username}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="
                  flex items-center space-x-1 px-4 py-2 rounded-full transition-all 
                  duration-200 shadow-sm hover:shadow-md 
                  bg-white border border-teal-200 text-teal-700
                  hover:bg-teal-50 hover:border-teal-500
                "
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>

              <Link
                href="/auth/register"
                className="
                  flex items-center space-x-1 text-white px-4 py-2 rounded-full 
                  transition-all duration-200 shadow-md hover:shadow-lg 
                  transform hover:-translate-y-0.5
                  bg-gradient-to-r from-teal-500 to-teal-700 
                  hover:from-teal-600 hover:to-teal-800
                "
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Screen */}
        <button
          className="md:hidden p-2 rounded-lg bg-white border border-teal-200 text-teal-700 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                <div className="px-3 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-teal-900">
                        {user.username}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-red-600 hover:bg-gray-50 border-t border-gray-100 cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="pt-3">
                  <Link
                    href="/auth/login"
                    className="block px-3 py-3 rounded-md text-teal-700 hover:bg-gray-50 text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    className="block px-3 py-3 rounded-md bg-teal-50 text-teal-600 hover:bg-teal-100 text-base font-medium mt-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
