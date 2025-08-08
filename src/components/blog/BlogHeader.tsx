import { formatDate } from "../../utils";
import BlogMetrics from "./BlogMetrics";
import { Blog } from "../../types";

interface BlogHeaderProps {
  blog: Blog;
  hasMounted: boolean;
}

export default function BlogHeader({ blog, hasMounted }: BlogHeaderProps) {
  return (
    <div
      className={`mb-8 sm:mb-12 transition-all duration-700 ease-out delay-200 ${
        hasMounted
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight mb-4 sm:mb-6">
        {blog.title}
      </h1>
      <p className="text-lg sm:text-xl text-primary-gray mb-4 sm:mb-6 leading-relaxed">
        {blog.description}
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <time className="text-sm sm:text-base text-primary-gray">
          Published on {formatDate(blog.createdAt)}
        </time>
        <BlogMetrics
          viewCount={blog.viewCount}
          readingTime={blog.readingTime}
        />
      </div>
    </div>
  );
} 