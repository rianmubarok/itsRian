import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";
import { Blog } from "../../types";

interface RelatedPostsProps {
  relatedPosts: Blog[];
  hasMounted: boolean;
}

export default function RelatedPosts({
  relatedPosts,
  hasMounted,
}: RelatedPostsProps) {
  if (relatedPosts.length === 0) return null;

  return (
    <section
      className={`mb-12 sm:mb-16 transition-all duration-700 ease-out delay-600 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between mb-6 sm:mb-8 text-primary-dark dark:text-primary-light">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-regular">Related Articles</h2>
        <Link
          href="/blog"
          className="group text-base sm:text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300"
        >
          View all articles
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {relatedPosts.slice(0, 3).map((relatedBlog) => (
          <div key={relatedBlog.id}>
            <BlogCard blog={relatedBlog} variant="list" />
          </div>
        ))}
      </div>
    </section>
  );
}
