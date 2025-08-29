import { Blog } from "../../types";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  relatedPosts: Blog[];
  hasMounted: boolean;
}

export default function RelatedPosts({
  relatedPosts,
  hasMounted,
}: RelatedPostsProps) {
  return (
    <section
      className={`mb-16 transition-all duration-700 ease-out delay-600 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tighter">
          Related Posts
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary-gray">View all</span>
          <div className="w-8 h-8 rounded-full bg-primary-gray/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary-gray"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedPosts.map((blog) => (
          <BlogCard key={blog.id} blog={blog} variant="tile" />
        ))}
      </div>
    </section>
  );
}
