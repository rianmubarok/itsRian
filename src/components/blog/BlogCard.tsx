import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Blog } from "../../types";
import { useEffect, useState } from "react";

interface BlogCardProps {
  blog: Blog;
  variant?: "list" | "featured";
}

export default function BlogCard({ blog, variant = "list" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <article className="group">
        <Link href={`/blog/${blog.slug}`} className="block">
                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Content */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Read more button */}
            <div className="mt-auto flex items-center gap-2 text-sm sm:text-base font-medium text-primary-dark dark:text-primary-light">
              <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                Read more
              </span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-1" />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="flex-shrink-0 w-full lg:w-110 h-60 sm:h-72 md:h-80 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-xl">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default to list variant
  return (
    <article className="group">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-4 sm:mb-5">
          {/* Thumbnail - moved to top on mobile */}
          <div className="flex-shrink-0 w-full md:w-50 h-60 sm:h-72 md:h-50 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-xl order-first md:order-last">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Meta info */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-gray mb-2 sm:mb-3 font-light">
              <span>{blog.viewCount} views</span>
              <span className="w-1 h-1 bg-primary-gray rounded-full"></span>
              <span>{blog.readingTime} read</span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-regular mb-2 sm:mb-3 text-primary-dark dark:text-primary-light">
              {blog.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-primary-gray mb-3 sm:mb-4 line-clamp-2">
              {blog.description}
            </p>

            {/* Read more button */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-dark dark:text-primary-light">
              <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                Read more
              </span>
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-1" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

interface AnimatedBlogCardProps {
  blog: Blog;
  variant?: "list" | "featured";
}

export function AnimatedBlogCard({
  blog,
  variant = "list",
}: AnimatedBlogCardProps) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-out delay-200 ${
        hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <BlogCard blog={blog} variant={variant} />
    </div>
  );
}
