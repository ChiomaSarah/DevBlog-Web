"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosReq from "@/app/axios-interceptor";
import ProtectedRoute from "@/app/components/protected-route";
import { AxiosError } from "axios";
import { Spinner } from "@/app/components/ui/spinner";
import { ArrowLeft, X, FileOutput } from "lucide-react";
import { GlassToast } from "@/app/components/ui/glass-toast";
import { Post } from "@/app/interfaces";

const EditPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSumitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { status, data } = await axiosReq.get(`/posts/${id}`);
        if (status === 200) {
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to update post!");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { status } = await axiosReq.patch(`/posts/${id}`, {
        title,
        content,
      });

      if (status === 200) {
        setShowSuccessToast(true);

        setTimeout(() => {
          router.push(`/posts/${id}`);
        }, 2000);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Failed to update post!");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint-50 to-mint-200">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-mint-200">
        <div className="border-b border-mint-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => router.push(`/posts/${id}`)}
              className="flex items-center gap-2 text-teal-800 hover:text-teal-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Post</span>
            </button>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-mint-200">
            <div className="px-6 py-8 bg-gradient-to-r from-teal-500 to-teal-700">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Edit Your Post
              </h1>
              <p className="text-sm mt-2 text-mint-100">
                Make changes to your masterpiece
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
                    className="block text-sm font-semibold text-slate-800 mb-2"
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
                    className="w-full rounded-xl px-4 py-3 text-sm border border-mint-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-semibold text-slate-800 mb-2"
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
                    className="w-full rounded-xl px-4 py-3 text-sm border border-mint-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 resize-y min-h-[200px]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-mint-200">
                  <button
                    type="submit"
                    disabled={isSumitting}
                    className="flex-1 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-0.5 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 cursor-pointer"
                  >
                    {isSumitting ? (
                      <Spinner size={16} color="text-white" />
                    ) : (
                      <FileOutput className="w-4 h-4" />
                    )}
                    Update Post
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push(`/posts/${id}`)}
                    className="flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-mint-300 text-teal-800 hover:border-teal-500 hover:bg-mint-50 cursor-pointer"
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
          isVisible={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          message="Post updated successfully!"
          description="Redirecting to posts..."
          type="success"
        />
      </div>
    </ProtectedRoute>
  );
};

export default EditPost;
