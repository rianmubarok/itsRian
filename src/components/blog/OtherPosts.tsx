import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Blog } from "../../types";
import BlogCard from "./BlogCard";

interface OtherPostsProps {
  relatedPosts: Blog[];
  hasMounted: boolean;
}

export default function OtherPosts({
  relatedPosts,
  hasMounted,
}: OtherPostsProps) {
  return (
    <section
      className={`mb-16 transition-all duration-700 ease-out delay-600 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold leading-tight tracking-tighter">
          Other Posts
        </h2>
        <Link
          href="/blog"
          className="group text-base sm:text-lg font-noto-serif-display italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300"
          aria-label="View all blog posts"
        >
          <span>View all</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedPosts.map((blog) => (
          <BlogCard key={blog.id} blog={blog} variant="tile" />
        ))}
      </div>
    </section>
  );
}
