import { Blog } from "../../types";

interface BlogThumbnailProps {
  blog: Blog;
  hasMounted: boolean;
}

export default function BlogThumbnail({ blog, hasMounted }: BlogThumbnailProps) {
  return (
    <div
      className={`mb-6 sm:mb-8 transition-all duration-700 ease-out delay-300 ${
        hasMounted
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative h-60 sm:h-70 md:h-100 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-xl">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
} 