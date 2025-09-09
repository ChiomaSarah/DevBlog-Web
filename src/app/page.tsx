import Link from "next/link";
import { BookOpen, PenTool, Users, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-teal-100">
            <Sparkles className="w-10 h-10 text-teal-500" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cyan-900 text-balance">
            Welcome to DevBlog
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-teal-700 text-pretty">
            A platform where developers share their knowledge, experiences, and
            insights through thoughtful blog posts. Join our community of
            passionate developers and start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/posts"
              className="inline-flex items-center justify-center text-white font-medium rounded-xl px-6 py-3 text-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl bg-gradient-to-r from-teal-500 to-teal-600"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Posts
            </Link>
            <Link
              href="/posts/create-post"
              className="inline-flex items-center justify-center font-medium rounded-xl px-6 py-3 text-lg transition-all duration-200 transform hover:-translate-y-0.5 border border-teal-500 text-teal-600 bg-transparent"
            >
              <PenTool className="mr-2 h-5 w-5" />
              Write a Post
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-2xl border border-teal-200 bg-white">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-teal-50">
              <BookOpen className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-cyan-900">
              Read & Learn
            </h3>
            <p className="text-sm text-teal-700">
              Discover insightful articles from experienced developers covering
              the latest technologies and best practices.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl border border-teal-200 bg-white">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-teal-50">
              <PenTool className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-cyan-900">
              Share Knowledge
            </h3>
            <p className="text-sm text-teal-700">
              Write and publish your own blog posts to share your experiences
              and help fellow developers grow.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl border border-teal-200 bg-white">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-teal-50">
              <Users className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-cyan-900">
              Join Community
            </h3>
            <p className="text-sm text-teal-700">
              Connect with like-minded developers, engage in discussions, and
              build meaningful professional relationships.
            </p>
          </div>
        </div>

        <div className="text-center rounded-2xl p-8 md:p-12 bg-teal-50 border border-teal-200">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-900">
            Ready to Start Your Developer Journey?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto text-teal-700">
            Whether you&apos;re looking to learn something new or share your
            expertise, Dev Blog is the perfect place to connect with the
            developer community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center text-white font-medium rounded-xl px-6 py-3 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl bg-gradient-to-r from-teal-500 to-teal-600"
            >
              Get Started
            </Link>
            <Link
              href="/posts"
              className="inline-flex items-center justify-center font-medium rounded-xl px-6 py-3 transition-all duration-200 transform hover:-translate-y-0.5 border border-teal-500 text-teal-600 bg-transparent"
            >
              Explore Posts
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
