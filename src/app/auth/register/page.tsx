"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosReq from "@/app/axios-interceptor";
import { Spinner } from "@/app/components/ui/spinner";
import { AxiosError } from "axios";
import { UserPlus, LogIn } from "lucide-react";
import { GlassToast } from "@/app/components/ui/glass-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);

    try {
      const { status } = await axiosReq.post("/auth/register", {
        username,
        password,
      });

      if (status === 201) {
        setShowToast(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Sign Up failed!");
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
              <UserPlus className="w-8 h-8 text-teal-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-teal-900">
              Join Dev Blog
            </h1>
            <p className="text-sm md:text-base text-teal-700">
              Create your account to start sharing your developer journey with
              the community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-xl text-sm bg-red-50 border border-red-200 text-red-600">
                {error}
              </div>
            )}

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
                className="w-full px-4 py-3 rounded-xl text-sm border border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="Choose a username"
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
                className="w-full px-4 py-3 rounded-xl text-sm border border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-2 text-teal-900"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm border border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-60 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
            >
              {loading ? (
                <Spinner text="Creating account..." />
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-teal-200">
            <p className="text-sm text-teal-700">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <GlassToast
        message="Account created successfully!"
        description="You can now log in."
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default Register;
