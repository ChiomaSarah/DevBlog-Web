"use client";
import { useState, useEffect } from "react";
import axiosReq from "../axios-interceptor";
import { PostCard } from "../components/post-card";
import { Post } from "../interfaces";
import { PenSquare, Sparkles } from "lucide-react";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosReq
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-teal-800">Loading posts...</p>
        </div>
      </div>
    );
  }

  const authorPostCounts = posts.reduce((acc, post) => {
    const authorKey =
      typeof post.authorId === "string" ? post.authorId : post.authorId._id;
    acc[authorKey] = (acc[authorKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const authors = Object.keys(authorPostCounts).length;
  const mostActivePosts =
    posts.length > 0 ? Math.max(...Object.values(authorPostCounts)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-teal-900">
            Community Posts
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-teal-800">
            Discover the latest developer insights, tutorials, and knowledge
            shared by our community
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-emerald-50">
              <Sparkles className="w-10 h-10 text-teal-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-teal-900">
              No posts yet
            </h2>
            <p className="text-lg mb-6 text-teal-800">
              Be the first to share your knowledge and inspire others!
            </p>
            <button
              onClick={() => (window.location.href = "/create-post")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transform transition-all duration-200 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <PenSquare className="w-4 h-4" />
              Create First Post
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-emerald-50 border border-teal-200">
              <div>
                <div className="text-2xl font-bold text-teal-900">
                  {posts.length}
                </div>
                <div className="text-sm text-teal-800">Total Posts</div>
              </div>
              <div className="w-px h-12 bg-teal-200"></div>
              <div>
                <div className="text-2xl font-bold text-teal-900">
                  {authors}
                </div>
                <div className="text-sm text-teal-800">Active Authors</div>
              </div>
              <div className="w-px h-12 bg-teal-200"></div>
              <div>
                <div className="text-2xl font-bold text-teal-900">
                  {mostActivePosts}
                </div>
                <div className="text-sm text-teal-800">
                  Most Active Author Posts
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
