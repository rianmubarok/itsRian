import Link from "next/link";
import { ArrowUpRight, Eye, Clock } from "lucide-react";
import { Blog } from "../../types";
import { useEffect, useState } from "react";

interface BlogCardProps {
  blog: Blog;
  variant?: "featured" | "tile";
}

export default function BlogCard({ blog, variant = "tile" }: BlogCardProps) {
  if (variant === "tile") {
    return (
      <article className="group w-full border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5 duration-300">
        <Link href={`/blog/${blog.slug}`}>
          <div className="relative h-[200px] sm:h-[250px] overflow-hidden rounded-xl">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="-mt-4 pt-10 p-6 bg-primary-light dark:bg-primary-dark rounded-b-xl">
          <Link href={`/blog/${blog.slug}`}>
            <h3 className="text-2xl font-semibold mb-2 sm:mb-3 text-primary-dark dark:text-primary-light">
              {blog.title}
            </h3>
          </Link>

          <p className="text-base text-primary-gray dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3 tracking-normal">
            {blog.description}
          </p>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-primary-gray">
            <span className="inline-flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {blog.viewCount} VIEWS
            </span>
            <span className="w-1 h-1 bg-primary-gray rounded-full" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {blog.readingTime} MINS READ
            </span>
          </div>
        </div>
      </article>
    );
  }
  if (variant === "featured") {
    return (
      <article className="group border border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5 duration-300">
        <Link href={`/blog/${blog.slug}`} className="block">
          <div className="flex flex-col lg:flex-row gap-4 bg-primary-light dark:bg-primary-dark rounded-l-xl">
            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-6 py-8">
              {/* Title */}
              <h1 className="text-5xl font-semibold leading-tight tracking-tighter">
                {blog.title}
              </h1>

              {/* Meta info */}
              <div className="flex items-center gap-3 text-xs sm:text-sm text-primary-gray mb-2 sm:mb-3 font-light">
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {blog.viewCount} VIEWS
                </span>
                <span className="w-1 h-1 bg-primary-gray rounded-full" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readingTime} MINS READ
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="flex-shrink-0 w-full lg:w-120 h-60 sm:h-72 md:h-80 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-xl">
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

  // Fallback to tile variant
  return (
    <article className="group w-full border border-primary-gray/20 rounded-3xl p-3 bg-gray-100 dark:bg-primary-light/5 duration-300">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative h-[200px] sm:h-[250px] md:h-[280px] overflow-hidden rounded-xl">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="-mt-4 pt-10 p-6 bg-primary-light dark:bg-primary-dark rounded-b-xl">
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="text-2xl font-semibold mb-2 sm:mb-3 text-primary-dark dark:text-primary-light">
            {blog.title}
          </h3>
        </Link>

        <p className="text-base text-primary-gray dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex items-center gap-3 text-xs sm:text-sm text-primary-gray">
          <span className="inline-flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {blog.viewCount}
          </span>
          <span className="w-1 h-1 bg-primary-gray rounded-full" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {blog.readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}

interface AnimatedBlogCardProps {
  blog: Blog;
  variant?: "featured" | "tile";
}

export function AnimatedBlogCard({
  blog,
  variant = "tile",
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
