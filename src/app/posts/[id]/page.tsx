"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";

import axiosReq from "@/app/axios-interceptor";
import { RootState } from "@/app/app-store/store";
import { Spinner } from "@/app/components/ui/spinner";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { Post } from "@/app/interfaces";
import { GlassToast } from "@/app/components/ui/glass-toast";
import { calculateReadingTime, formatDate } from "@/app/utils";

const PostDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const { status, data } = await axiosReq.get(`/posts/${id}`);
        if (status === 200) {
          setPost(data);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to load post!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { status } = await axiosReq.delete(`/posts/${id}`);
      if (status) {
        setShowSuccessToast(true);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Failed to delete post!");
        setShowDeleteConfirm(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint-50 to-mint-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-mint-100">
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-mint-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center text-teal-900">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Confirm Deletion
              </h3>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6 text-teal-700">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 font-medium rounded-xl text-teal-700 hover:text-teal-900 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-white rounded-xl font-medium flex items-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
              >
                {isDeleting ? (
                  <Spinner size={16} text="Deleting..." />
                ) : (
                  "Delete Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link href="/">
          <span className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors cursor-pointer mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Posts
          </span>
        </Link>

        {error && (
          <div className="mb-6 p-4 rounded-xl shadow-sm border-l-4 bg-red-50 border-red-500 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {!error && post && (
          <article className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-mint-200">
            <header className="mb-8 pb-6 border-b border-mint-200">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-teal-900">
                {post?.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                <div className="flex flex-wrap items-center gap-4 text-teal-700">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-full bg-mint-50">
                      <User className="h-4 w-4 text-teal-500" />
                    </div>
                    <span className="font-medium">
                      {post?.authorId?.username}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-full bg-mint-50">
                      <Calendar className="h-4 w-4 text-teal-500" />
                    </div>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-full bg-mint-50">
                      <Clock className="h-4 w-4 text-teal-500" />
                    </div>
                    <span>{calculateReadingTime(post.content)} min read</span>
                  </div>
                </div>

                {user && user._id === post?.authorId?._id && (
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <button
                      onClick={() =>
                        router.push(`/posts/edit-post/${post?._id}`)
                      }
                      className="flex items-center justify-center p-3 border rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-mint-50 border-mint-200 text-teal-700 hover:bg-mint-100 hover:border-teal-400 cursor-pointer"
                      title="Edit post"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center justify-center p-3 border rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-red-50 border-red-200 text-red-500 hover:bg-red-100 hover:border-red-400 cursor-pointer"
                      title="Delete post"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-lg max-w-none leading-relaxed whitespace-pre-wrap text-teal-700">
              {post?.content}
            </div>
          </article>
        )}
      </main>

      <GlassToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        message="Post deleted successfully!"
        description="Redirecting to homepage..."
        type="success"
      />
    </div>
  );
};

export default PostDetails;
