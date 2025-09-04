import Link from "next/link";
import { BookOpen, PenTool, Users, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f0fdf9 0%, #ccfbef 100%)",
      }}
    >
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: "#ccfbef" }}
          >
            <Sparkles className="w-10 h-10" style={{ color: "#14b8a6" }} />
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            style={{ color: "#134e4a" }}
          >
            Welcome to DevBlog
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-pretty"
            style={{ color: "#0f766e" }}
          >
            A platform where developers share their knowledge, experiences, and
            insights through thoughtful blog posts. Join our community of
            passionate developers and start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/posts"
              className="inline-flex items-center justify-center text-white font-medium rounded-xl px-6 py-3 text-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{
                background: "linear-gradient(90deg, #14b8a6 0%, #0d9488 100%)",
              }}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Posts
            </Link>
            <Link
              href="/posts/create-post"
              className="inline-flex items-center justify-center font-medium rounded-xl px-6 py-3 text-lg transition-all duration-200 transform hover:-translate-y-0.5 border"
              style={{
                borderColor: "#14b8a6",
                color: "#0d9488",
                backgroundColor: "transparent",
              }}
            >
              <PenTool className="mr-2 h-5 w-5" />
              Write a Post
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div
            className="text-center p-6 rounded-2xl border"
            style={{
              backgroundColor: "white",
              borderColor: "#99f6e0",
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#f0fdf9" }}
            >
              <BookOpen className="h-6 w-6" style={{ color: "#14b8a6" }} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#134e4a" }}
            >
              Read & Learn
            </h3>
            <p className="text-sm" style={{ color: "#0f766e" }}>
              Discover insightful articles from experienced developers covering
              the latest technologies and best practices.
            </p>
          </div>

          <div
            className="text-center p-6 rounded-2xl border"
            style={{
              backgroundColor: "white",
              borderColor: "#99f6e0",
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#f0fdf9" }}
            >
              <PenTool className="h-6 w-6" style={{ color: "#14b8a6" }} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#134e4a" }}
            >
              Share Knowledge
            </h3>
            <p className="text-sm" style={{ color: "#0f766e" }}>
              Write and publish your own blog posts to share your experiences
              and help fellow developers grow.
            </p>
          </div>

          <div
            className="text-center p-6 rounded-2xl border"
            style={{
              backgroundColor: "white",
              borderColor: "#99f6e0",
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#f0fdf9" }}
            >
              <Users className="h-6 w-6" style={{ color: "#14b8a6" }} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#134e4a" }}
            >
              Join Community
            </h3>
            <p className="text-sm" style={{ color: "#0f766e" }}>
              Connect with like-minded developers, engage in discussions, and
              build meaningful professional relationships.
            </p>
          </div>
        </div>

        <div
          className="text-center rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: "#f0fdf9",
            border: "1px solid #99f6e0",
          }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "#134e4a" }}
          >
            Ready to Start Your Developer Journey?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: "#0f766e" }}>
            Whether you&apos;re looking to learn something new or share your
            expertise, Dev Blog is the perfect place to connect with the
            developer community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center text-white font-medium rounded-xl px-6 py-3 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{
                background: "linear-gradient(90deg, #14b8a6 0%, #0d9488 100%)",
              }}
            >
              Get Started
            </Link>
            <Link
              href="/posts"
              className="inline-flex items-center justify-center font-medium rounded-xl px-6 py-3 transition-all duration-200 transform hover:-translate-y-0.5 border"
              style={{
                borderColor: "#14b8a6",
                color: "#0d9488",
                backgroundColor: "transparent",
              }}
            >
              Explore Posts
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
