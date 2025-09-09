"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axiosReq from "@/app/axios-interceptor";
import ProtectedRoute from "@/app/components/protected-route";
import { AxiosError } from "axios";
import { Spinner } from "@/app/components/ui/spinner";
import { GlassToast } from "@/app/components/ui/glass-toast";
import { ArrowLeft, Send, X } from "lucide-react";
import Link from "next/link";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { status } = await axiosReq.post("/posts", { title, content });
      if (status === 201) {
        setShowToast(true);
        setTimeout(() => {
          router.push("/posts");
        }, 1500);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Failed to create post!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className=" bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/">
              <span className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors cursor-pointer my-6 group">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </span>
            </Link>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-xl border border-teal-200 overflow-hidden">
            <div className="px-6 py-8 bg-gradient-to-r from-teal-500 to-teal-700">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Create New Post
              </h1>
              <p className="text-sm mt-2 text-teal-100">
                Share your thoughts with the world
              </p>
            </div>

            <div className="p-6 md:p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-red-800">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-teal-900 mb-2"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Craft an engaging title..."
                    className="w-full rounded-xl px-4 py-3 text-sm border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 resize-y"
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-semibold text-teal-900 mb-2"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Pour your thoughts here..."
                    rows={12}
                    className="w-full rounded-xl px-4 py-3 text-sm border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 resize-y min-h-[200px]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-teal-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transform cursor-pointer bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    {loading ? (
                      <Spinner className="w-4 h-4" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Publish Post
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-teal-300 text-teal-800 hover:bg-teal-50 hover:border-teal-500"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        <GlassToast
          message="Post published successfully!"
          description="Your article is live! 🎉"
          type="success"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </ProtectedRoute>
  );
};

export default CreatePost;
