import Link from "next/link";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { PostCardProps } from "../interfaces";
import { calculateReadingTime, formatDate, getExcerpt } from "../utils";

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-mint-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-teal-400 group cursor-pointer">
      <div className="pb-4 mb-4 border-b border-mint-100">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold leading-tight text-teal-900 transition-colors group-hover:text-teal-950 cursor-pointer">
            {post.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm mt-3 text-teal-700">
          <div className="flex items-center space-x-1.5">
            <div className="p-1 rounded-full bg-mint-50">
              <User className="h-3 w-3 text-teal-500" />
            </div>
            <span className="font-medium">{post.authorId?.username}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <div className="p-1 rounded-full bg-mint-50">
              <Calendar className="h-3 w-3 text-teal-500" />
            </div>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <div className="p-1 rounded-full bg-mint-50">
              <Clock className="h-3 w-3 text-teal-500" />
            </div>
            <span>{calculateReadingTime(post.content)} min read</span>
          </div>
        </div>
      </div>

      <div>
        <p className="leading-relaxed mb-5 text-teal-700">
          {getExcerpt(post.content)}
        </p>

        <Link
          href={`/posts/${post._id}`}
          className="inline-flex items-center font-semibold text-teal-600 hover:text-emerald-600 transition-all group/readmore"
        >
          Read more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/readmore:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
