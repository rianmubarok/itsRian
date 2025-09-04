import { formatDate } from "../../../utils";
import BlogMetrics from "../BlogMetrics";
import { Blog } from "../../../types";

interface BlogHeaderProps {
  blog: Blog;
  hasMounted: boolean;
}

export default function BlogHeader({ blog, hasMounted }: BlogHeaderProps) {
  return (
    <div
      className={`mb-8 sm:mb-12 transition-all duration-700 ease-out delay-200 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <h1 className="text-5xl font-semibold leading-tighter tracking-tighter mb-4">
        {blog.title}
      </h1>
      <p className="text-base text-primary-dark dark:text-gray-300 mb-4 sm:mb-6 tracking-normal">
        {blog.description}
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 tracking-normal">
        <time className="text-xs text-primary-gray">
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
