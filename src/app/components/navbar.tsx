"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "../app-store/store";
import { resetUser } from "../app-store/authSlice";
import { PenTool, User, LogOut, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(resetUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <nav
        className="
          flex justify-between items-center px-4 sm:px-6 lg:px-8 
          shadow-md rounded-b-lg h-20 
          bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-200
        "
      >
        <Link href="/" className="flex items-center space-x-2 group">
          <div
            className="
              p-2 rounded-full shadow-sm bg-white 
              group-hover:scale-110 transition-transform duration-200
            "
          >
            <PenTool className="h-6 w-6 text-teal-500" />
          </div>
          <span
            className="
              font-bold text-2xl bg-clip-text text-transparent 
              bg-gradient-to-r from-teal-500 to-teal-700
            "
          >
            DevBlog
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <div
                className="
                  flex items-center space-x-2 px-4 py-2 rounded-full shadow-sm 
                  bg-white border border-teal-200
                "
              >
                <User className="h-4 w-4 text-teal-500" />
                <span className="font-medium text-teal-800">
                  {user.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="
                  flex items-center space-x-1 text-white px-4 py-2 rounded-full 
                  transition-all duration-200 shadow-md hover:shadow-lg 
                  transform hover:-translate-y-0.5
                  bg-gradient-to-r from-red-500 to-red-600 
                  hover:from-red-600 hover:to-red-700
                "
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
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
                href="/auth/signup"
                className="
                  flex items-center space-x-1 text-white px-4 py-2 rounded-full 
                  transition-all duration-200 shadow-md hover:shadow-lg 
                  transform hover:-translate-y-0.5
                  bg-gradient-to-r from-teal-500 to-teal-700 
                  hover:from-teal-600 hover:to-teal-800
                "
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg bg-white border border-teal-200 text-teal-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-teal-200 shadow-lg rounded-b-lg">
            <div className="px-4 py-4 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-teal-50 rounded-lg">
                    <User className="h-4 w-4 text-teal-500" />
                    <span className="font-medium text-teal-800">
                      {user.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center justify-center space-x-2 
                      text-white px-4 py-3 rounded-lg 
                      bg-gradient-to-r from-red-500 to-red-600
                    "
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="
                      block w-full text-center px-4 py-3 rounded-lg 
                      bg-teal-50 text-teal-700 font-medium border border-teal-200
                      hover:bg-teal-100 transition-colors
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="
                      block w-full text-center px-4 py-3 rounded-lg 
                      bg-gradient-to-r from-teal-500 to-teal-700 text-white font-medium
                      hover:from-teal-600 hover:to-teal-800 transition-all
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
