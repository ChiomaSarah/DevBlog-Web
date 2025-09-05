"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setUser } from "@/app/app-store/authSlice";
import axiosReq from "@/app/axios-interceptor";
import { useDispatch } from "react-redux";
import { Spinner } from "@/app/components/ui/spinner";
import { GlassToast } from "@/app/components/ui/glass-toast";
import { AxiosError } from "axios";
import { LogIn, UserPlus } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const { status, data } = await axiosReq.post("/auth/login", {
        username,
        password,
      });

      if (status === 200) {
        const { token, user } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(setUser(user));

        setShowToast(true);
        setTimeout(() => {
          router.push("/posts");
        }, 1200);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Login failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-teal-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-emerald-50">
              <LogIn className="w-8 h-8 text-teal-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-teal-900">
              Welcome Back!
            </h1>
            <p className="text-sm md:text-base text-teal-700">
              Sign in to your account to continue writing and sharing your
              developer journey.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl text-sm bg-red-50 border border-red-200 text-red-600">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-2 text-teal-900"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-xl text-sm border border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-teal-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl text-sm border border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <Spinner text="Signing in..." />
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-teal-200">
            <p className="text-sm text-teal-700">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <GlassToast
        message="Login successful!"
        description="Welcome back! 👋"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default Login;
